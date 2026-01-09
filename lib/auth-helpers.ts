/**
 * Authentication helpers for NextAuth + PostgreSQL
 */

import bcrypt from 'bcryptjs';
import { query, queryOne } from './db';

/**
 * Create a new user
 */
export async function createUser(email: string, password: string) {
  // Hash password
  const password_hash = await bcrypt.hash(password, 10);

  // Insert user
  const result = await queryOne<{ id: string; email: string }>(
    `INSERT INTO users (email, password_hash, subscription_status)
     VALUES ($1, $2, 'trial')
     RETURNING id, email`,
    [email, password_hash]
  );

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result;
}

/**
 * Check if email already exists
 */
export async function emailExists(email: string): Promise<boolean> {
  const result = await queryOne<{ count: string }>(
    'SELECT COUNT(*) as count FROM users WHERE email = $1',
    [email]
  );

  return result ? parseInt(result.count) > 0 : false;
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string) {
  return queryOne<{
    id: string;
    email: string;
    subscription_status: string;
    stripe_customer_id?: string;
  }>(
    `SELECT id, email, subscription_status, stripe_customer_id
     FROM users
     WHERE id = $1`,
    [userId]
  );
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  return queryOne<{
    id: string;
    email: string;
    subscription_status: string;
  }>(
    `SELECT id, email, subscription_status
     FROM users
     WHERE email = $1`,
    [email]
  );
}

/**
 * Update user subscription
 */
export async function updateUserSubscription(
  userId: string,
  data: {
    subscription_status?: string;
    subscription_id?: string;
    stripe_customer_id?: string;
  }
) {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.subscription_status) {
    updates.push(`subscription_status = $${paramCount++}`);
    values.push(data.subscription_status);
  }

  if (data.subscription_id) {
    updates.push(`subscription_id = $${paramCount++}`);
    values.push(data.subscription_id);
  }

  if (data.stripe_customer_id) {
    updates.push(`stripe_customer_id = $${paramCount++}`);
    values.push(data.stripe_customer_id);
  }

  if (updates.length === 0) {
    return;
  }

  values.push(userId);

  await query(
    `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount}`,
    values
  );
}
