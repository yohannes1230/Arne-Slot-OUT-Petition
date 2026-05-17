export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
    public: {
        Tables: {
            petitions: {
                Row: {
                    id: string;
                    total_signatures: number;
                    updated_at: string | null;
                };
                Insert: {
                    id?: string;
                    total_signatures?: number;
                };
                Update: {
                    id?: string;
                    total_signatures?: number;
                };
            };
        };
        Functions: {
            sign_petition: {
                Args: {
                    p_petition_id: string;
                    p_ip: string;
                    p_fingerprint: string;
                    p_country?: string;
                    p_city?: string;
                };
                Returns: {
                    success: boolean;
                    total_signatures: number;
                    message?: string;
                };
            };
        };
    };
}
export type SignPetitionArgs = Database['public']['Functions']['sign_petition']['Args'];
export type SignPetitionResult = Database['public']['Functions']['sign_petition']['Returns'];
