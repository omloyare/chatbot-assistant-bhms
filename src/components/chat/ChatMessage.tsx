import React from 'react';
import { User, Bot, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { WikiSearchResult } from '../../lib/wikipedia';

interface ChatMessageProps {
  message: string;
  isBot?: boolean;
  sources?: WikiSearchResult[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot = false, sources }) => {
  return (
    <div className={`flex gap-4 p-4 ${isBot ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex-shrink-0">
        {isBot ? (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="prose max-w-none">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
        {sources && sources.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Related Articles:</span>
            </div>
            <div className="space-y-2">
              {sources.map((source) => (
                <div key={source.pageid} className="text-sm bg-white p-2 rounded border">
                  <a
                    href={`https://en.wikipedia.org/?curid=${source.pageid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {source.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};