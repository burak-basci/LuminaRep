/**
 * Stripe Integration
 */

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

/**
 * Create a checkout session for subscription
 */
export async function createCheckoutSession(
  userId: string,
  email: string
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    client_reference_id: userId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    subscription_data: {
      trial_period_days: 7,
      metadata: {
        userId,
      },
    },
  });

  return session;
}

/**
 * Create a portal session for subscription management
 */
export async function createPortalSession(
  customerId: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return session;
}

/**
 * Get subscription status
 */
export async function getSubscriptionStatus(
  customerId: string
): Promise<'trial' | 'active' | 'cancelled' | 'past_due'> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
  });

  if (subscriptions.data.length === 0) {
    return 'trial';
  }

  const subscription = subscriptions.data[0];

  if (subscription.status === 'active') {
    if (subscription.trial_end && subscription.trial_end * 1000 > Date.now()) {
      return 'trial';
    }
    return 'active';
  }

  if (subscription.status === 'past_due') {
    return 'past_due';
  }

  return 'cancelled';
}
