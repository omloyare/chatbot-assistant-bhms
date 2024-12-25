import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { generateResponse } from '../../lib/chatbot';
import type { Message } from '../../types/chat';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Send initial greeting when component mounts
    const initializeChat = async () => {
      const response = await generateResponse('');
      setMessages([
        {
          id: Date.now().toString(),
          content: response.content,
          role: 'assistant',
          sources: response.sources
        }
      ]);
    };
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateResponse(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        sources: response.sources
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I encountered an error. Please try again.',
        role: 'assistant'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary fallback={<div className="text-red-600 p-4">Failed to load chat. Please refresh the page.</div>}>
      <div className="flex h-full flex-col">
        <div className="flex-grow overflow-y-auto">
          <div className="container mx-auto max-w-4xl">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isBot={message.role === 'assistant'}
                sources={message.sources}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </ErrorBoundary>
  );
};