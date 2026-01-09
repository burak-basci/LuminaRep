/**
 * PostgreSQL Database Client
 */

import { Pool } from 'pg';

// Create a connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database Types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
  subscription_status: 'trial' | 'active' | 'cancelled' | 'past_due';
  subscription_id?: string;
  stripe_customer_id?: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  google_business_url: string;
  created_at: Date;
  status: 'processing' | 'completed' | 'failed';
}

export interface GeneratedContent {
  id: string;
  campaign_id: string;
  review_text: string;
  caption_1: string;
  caption_2: string;
  caption_3: string;
  video_script: string;
  image_prompt: string;
  created_at: Date;
}

/**
 * Query helper with error handling
 */
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

/**
 * Single row query helper
 */
export async function queryOne<T = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows.length > 0 ? rows[0] : null;
}
