import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface User {
  id: string;
  email: string;
  created_at: string;
  subscription_status: 'trial' | 'active' | 'cancelled' | 'past_due';
  subscription_id?: string;
  stripe_customer_id?: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  google_business_url: string;
  created_at: string;
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
  created_at: string;
}
