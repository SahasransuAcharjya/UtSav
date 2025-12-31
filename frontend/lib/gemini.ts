// frontend/lib/gemini.ts
import { apiClient } from './api';

export interface GeminiRefineRequest {
  rawDescription: string;
  guestCount?: number;
  location?: string;
  eventType?: string;
  budgetHint?: string;
}

export interface GeminiResponse {
  summary: string;
  budget?: {
    min: number;
    max: number;
    recommended: number;
  };
  requirements?: string[];
}

export const gemini = {
  refineEvent: async (data: GeminiRefineRequest): Promise<GeminiResponse> => {
    return apiClient.post<GeminiResponse>('/gemini/refine-event', data);
  },

  suggestEventDetails: async (prompt: string): Promise<GeminiResponse> => {
    return apiClient.post<GeminiResponse>('/gemini/suggest-details', { prompt });
  },
};

// Custom hook
export function useGemini() {
  return {
    refineEvent: gemini.refineEvent,
    suggestEventDetails: gemini.suggestEventDetails,
  };
}
