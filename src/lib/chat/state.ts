import type { WikiSearchResult } from '../wikipedia';

export interface ChatState {
  topic: string | null;
  currentQuestion: string | null;
  awaitingAnswer: boolean;
  context: string[];
  lastSearchResults: WikiSearchResult[];
  conversationHistory: string[];
}

export const createInitialState = (): ChatState => ({
  topic: null,
  currentQuestion: null,
  awaitingAnswer: false,
  context: [],
  lastSearchResults: [],
  conversationHistory: []
});