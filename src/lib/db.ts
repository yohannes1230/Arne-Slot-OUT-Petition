import { supabase } from '@/lib/supabase';
import type { SignPetitionArgs } from '@/lib/types';

const PETITION_ID = process.env.NEXT_PUBLIC_PETITION_ID;

type SignPetitionPayload = Omit<SignPetitionArgs, 'petition_id'> & {
  petition_id: string | number;
};

export async function getSignatureCount() {
  let query = supabase.from('petitions').select('total_signatures');

  if (PETITION_ID) {
    query = query.eq('id', PETITION_ID);
  }

  try {
    const { data, error } = await query.limit(1).single<{ total_signatures: number }>();

    if (error) {
      console.error('Error fetching petition count:', error);
      return 0;
    }

    return data?.total_signatures ?? 0;
  } catch (err) {
    console.error('Fetch exception when getting signature count:', err);
    return 0;
  }
}

export async function signPetition(payload: SignPetitionPayload) {
  const { data, error } = await (supabase as any).rpc('sign_petition', payload);

  if (error) {
    console.error('Error calling sign_petition RPC:', error);
    throw error;
  }

  return data;
}
