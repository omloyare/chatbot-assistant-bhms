export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  sources?: Array<{
    title: string;
    snippet: string;
    pageid: number;
  }>;
}

export interface ChatResponse {
  role: 'assistant';
  content: string;
  sources?: Array<{
    title: string;
    snippet: string;
    pageid: number;
  }>;
}