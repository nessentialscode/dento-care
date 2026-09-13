import { supabase } from './supabaseClient';

export type FeedbackStatus = 'pending' | 'approved' | 'rejected';

export interface FeedbackItem {
  id: string;
  full_name: string;
  rating: number;
  treatment?: string | null;
  branch?: string | null;
  message: string;
  status: FeedbackStatus;
  created_at: string;
  updated_at: string;
}

export interface SubmitFeedbackPayload {
  fullName: string;
  rating: number;
  treatment?: string;
  branch?: string;
  message: string;
}

/**
 * Submits patient feedback (public). Initial status is strictly 'pending'.
 */
export async function submitFeedback(payload: SubmitFeedbackPayload): Promise<void> {
  const { error } = await supabase
    .from('feedback')
    .insert([
      {
        full_name: payload.fullName.trim(),
        rating: payload.rating,
        treatment: payload.treatment?.trim() || null,
        branch: payload.branch?.trim() || null,
        message: payload.message.trim(),
        status: 'pending',
      },
    ]);

  if (error) {
    console.error('Error submitting feedback:', error);
    throw new Error(error.message || 'Failed to submit feedback. Please try again.');
  }
}

/**
 * Fetches approved feedback for public display in the Reviews section.
 */
export async function fetchApprovedFeedback(): Promise<FeedbackItem[]> {
  const { data, error } = await supabase
    .from('feedback')
    .select('id, full_name, rating, treatment, branch, message, status, created_at, updated_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching approved feedback:', error);
    return [];
  }

  return (data || []) as FeedbackItem[];
}

/**
 * Fetches all feedback for the Admin Portal.
 */
export async function fetchAllFeedbackForAdmin(): Promise<FeedbackItem[]> {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching feedback for admin:', error);
    throw new Error('Failed to load feedback records.');
  }

  return (data || []) as FeedbackItem[];
}

/**
 * Moderates feedback status (Admin only): Approve or Reject.
 */
export async function moderateFeedback(
  id: string,
  status: 'approved' | 'rejected'
): Promise<FeedbackItem> {
  const { data, error } = await supabase
    .from('feedback')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error moderating feedback:', error);
    throw new Error(error.message || 'Failed to moderate feedback.');
  }

  return data as FeedbackItem;
}
