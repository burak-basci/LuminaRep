"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getCurrentUser, signOut } from '@/lib/auth';

interface Campaign {
  id: string;
  name: string;
  google_business_url: string;
  created_at: string;
  status: 'processing' | 'completed' | 'failed';
}

interface GeneratedContent {
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

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [content, setContent] = useState<GeneratedContent[]>([]);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignUrl, setNewCampaignUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadCampaigns();
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      loadContent(selectedCampaign);
    }
  }, [selectedCampaign]);

  async function checkAuth() {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/auth');
      } else {
        setUser(currentUser);
      }
    } catch (error) {
      router.push('/auth');
    }
  }

  async function loadCampaigns() {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    }
  }

  async function loadContent(campaignId: string) {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  async function handleCreateCampaign() {
    if (!newCampaignName || !newCampaignUrl) return;

    setLoading(true);
    try {
      // Create campaign
      const response = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCampaignName,
          googleBusinessUrl: newCampaignUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to create campaign');

      const data = await response.json();

      setShowNewCampaign(false);
      setNewCampaignName('');
      setNewCampaignUrl('');
      loadCampaigns();
      setSelectedCampaign(data.campaignId);
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();
    router.push('/');
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <nav className="border-b border-luxury-border">
        <div className="container-luxury py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
            <span className="text-2xl font-bold gradient-text">LuminaRep</span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-400">
              {user?.email}
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container-luxury py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Campaigns List */}
          <div className="col-span-3">
            <div className="card mb-6">
              <button
                onClick={() => setShowNewCampaign(true)}
                className="btn-primary w-full"
              >
                + New Campaign
              </button>
            </div>

            <div className="card space-y-2">
              <h2 className="font-bold mb-4">Your Campaigns</h2>
              {campaigns.length === 0 ? (
                <p className="text-gray-500 text-sm">No campaigns yet</p>
              ) : (
                campaigns.map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCampaign === campaign.id
                        ? 'bg-primary/20 border border-primary'
                        : 'hover:bg-luxury-gray-light'
                    }`}
                  >
                    <div className="font-semibold text-sm">{campaign.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(campaign.created_at).toLocaleDateString()}
                    </div>
                    <div className={`text-xs mt-1 ${
                      campaign.status === 'completed' ? 'text-primary' :
                      campaign.status === 'processing' ? 'text-accent' :
                      'text-red-500'
                    }`}>
                      {campaign.status}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {showNewCampaign ? (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Create New Campaign</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      value={newCampaignName}
                      onChange={(e) => setNewCampaignName(e.target.value)}
                      className="input"
                      placeholder="e.g., January 2026 Reviews"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Google Business URL
                    </label>
                    <input
                      type="url"
                      value={newCampaignUrl}
                      onChange={(e) => setNewCampaignUrl(e.target.value)}
                      className="input"
                      placeholder="https://maps.google.com/..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Paste your Google Maps business profile URL
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleCreateCampaign}
                      disabled={loading || !newCampaignName || !newCampaignUrl}
                      className="btn-primary"
                    >
                      {loading ? 'Creating...' : 'Generate Content'}
                    </button>
                    <button
                      onClick={() => setShowNewCampaign(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : selectedCampaign && content.length > 0 ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Generated Content</h2>
                  <div className="text-sm text-gray-400">
                    {content.length} review{content.length !== 1 ? 's' : ''} processed
                  </div>
                </div>

                {content.map((item) => (
                  <div key={item.id} className="card space-y-6">
                    {/* Original Review */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-primary">Original Review</h3>
                        <button
                          onClick={() => copyToClipboard(item.review_text, `review-${item.id}`)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          {copiedId === `review-${item.id}` ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm italic bg-luxury-gray-light p-4 rounded-lg">
                        "{item.review_text}"
                      </p>
                    </div>

                    {/* Captions */}
                    <div>
                      <h3 className="font-bold text-accent mb-3">Instagram Captions</h3>
                      <div className="space-y-3">
                        {[item.caption_1, item.caption_2, item.caption_3].map((caption, idx) => (
                          <div key={idx} className="bg-luxury-gray-light p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-gray-500">Variation {idx + 1}</span>
                              <button
                                onClick={() => copyToClipboard(caption, `caption-${item.id}-${idx}`)}
                                className="text-xs text-gray-400 hover:text-white"
                              >
                                {copiedId === `caption-${item.id}-${idx}` ? '✓ Copied' : 'Copy'}
                              </button>
                            </div>
                            <p className="text-sm text-gray-300">{caption}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Video Script */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-accent">Video Script (Reels/TikTok)</h3>
                        <button
                          onClick={() => copyToClipboard(item.video_script, `script-${item.id}`)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          {copiedId === `script-${item.id}` ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-luxury-gray-light p-4 rounded-lg">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                          {item.video_script}
                        </pre>
                      </div>
                    </div>

                    {/* Image Prompt */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-accent">Image Generation Prompt</h3>
                        <button
                          onClick={() => copyToClipboard(item.image_prompt, `image-${item.id}`)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          {copiedId === `image-${item.id}` ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-luxury-gray-light p-4 rounded-lg">
                        <p className="text-sm text-gray-300">{item.image_prompt}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Use with DALL-E 3, Midjourney, or Stable Diffusion
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-16">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-2xl font-bold mb-2">Welcome to LuminaRep</h2>
                <p className="text-gray-400 mb-6">
                  {campaigns.length === 0
                    ? 'Create your first campaign to get started'
                    : 'Select a campaign from the sidebar to view generated content'}
                </p>
                {campaigns.length === 0 && (
                  <button
                    onClick={() => setShowNewCampaign(true)}
                    className="btn-primary"
                  >
                    Create Your First Campaign
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
