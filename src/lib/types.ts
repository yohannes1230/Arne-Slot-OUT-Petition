export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
    public: {
        Tables: {
            petitions: {
                Row: {
                    id: number;
                    total_signatures: number;
                    updated_at: string | null;
                };
                Insert: {
                    id?: number;
                    total_signatures?: number;
                };
                Update: {
                    id?: number;
                    total_signatures?: number;
                };
            };
        };
        Functions: {
            sign_petition: {
                Args: {
                    petition_id: number;
                    ip_address: string;
                    fingerprint: string;
                    country?: string;
                    city?: string;
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