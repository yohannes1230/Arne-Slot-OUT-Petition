import { hasSupabaseConfig, supabase } from '@/lib/supabase';
import type { SignPetitionArgs, SignPetitionResult } from '@/lib/types';

const PETITION_ID = process.env.NEXT_PUBLIC_PETITION_ID;

type SignPetitionPayload = SignPetitionArgs;
type RpcError = { message: string };
type SignPetitionRpcClient = {
  rpc: (
    functionName: 'sign_petition',
    args: SignPetitionPayload
  ) => Promise<{ data: unknown; error: RpcError | null }>;
};

async function getPetitionId() {
  if (PETITION_ID) {
    return PETITION_ID;
  }

  const { data, error } = await supabase.from('petitions').select('id').limit(1).single<{ id: string }>();

  if (error || !data?.id) {
    console.error('Error fetching petition id:', error);
    return null;
  }

  return data.id;
}

export async function getSignatureCount() {
  if (!hasSupabaseConfig) {
    return 0;
  }

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

export async function signPetition(payload: SignPetitionPayload): Promise<SignPetitionResult | null> {
  if (!hasSupabaseConfig) {
    return null;
  }

  const rpcClient = supabase as unknown as SignPetitionRpcClient;
  const { data, error } = await rpcClient.rpc('sign_petition', payload);

  if (error) {
    console.error('Error calling sign_petition RPC:', error);
    throw error;
  }

  return data as unknown as SignPetitionResult;
}

export async function signCurrentPetition(args: {
  fingerprint: string;
  country?: string;
  city?: string;
}): Promise<SignPetitionResult | null> {
  if (!hasSupabaseConfig) {
    return null;
  }

  const petitionId = await getPetitionId();

  if (!petitionId) {
    return null;
  }

  return signPetition({
    p_petition_id: petitionId,
    p_ip: 'browser',
    p_fingerprint: args.fingerprint,
    p_country: args.country,
    p_city: args.city,
  });
}
