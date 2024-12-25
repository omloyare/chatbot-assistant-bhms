import OpenAI from 'openai';
import { config } from '../config/env';

let openaiInstance: OpenAI | null = null;

const getOpenAIInstance = (): OpenAI => {
  if (!openaiInstance) {
    try {
      openaiInstance = new OpenAI({
        apiKey: config.openai.apiKey,
        dangerouslyAllowBrowser: true
      });
    } catch (error) {
      console.error('Failed to initialize OpenAI:', error);
      throw new Error('Failed to initialize chat service. Please check your configuration.');
    }
  }
  return openaiInstance;
};

export const generateChatResponse = async (messages: Array<{ role: 'user' | 'assistant' | 'system', content: string }>) => {
  try {
    const openai = getOpenAIInstance();
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a knowledgeable homeopathy tutor for BHMS students in India. 
          Your role is to:
          1. Ask questions about homeopathy topics based on their educational syllabus
          2. Break down complex topics into manageable pieces
          3. Provide structured feedback on student answers
          4. Guide students through topics systematically
          5. Help students remember key points for exams`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating chat response:', error);
    if (error instanceof Error) {
      throw new Error(`Chat service error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred with the chat service');
  }
};