import { searchWikipedia, getWikipediaExtract } from '../wikipedia';
import { extractKeywords } from '../../utils/stringUtils';
import type { ChatState } from './state';
import { analyzeUserResponse } from './responseAnalyzer';

export async function generateTopicResponse(
  userMessage: string,
  state: ChatState
) {
  const searchResults = await searchWikipedia(userMessage);
  
  if (searchResults.length === 0) {
    return {
      content: "I couldn't find specific information about that topic. Could you please try rephrasing or choose a different homeopathy topic?",
      sources: []
    };
  }

  const extract = await getWikipediaExtract(searchResults[0].pageid);
  const summary = generateSummary(extract);
  
  return {
    content: `Here's what I found about ${state.topic || 'this topic'}:\n\n${summary}\n\nWould you like me to ask you questions about this topic to help you study?`,
    sources: searchResults
  };
}

export function generateSummary(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const importantSentences = sentences.slice(0, 3);
  return importantSentences.join('. ') + '.';
}

export function generateStudyQuestion(context: string): string {
  const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20);
  if (sentences.length === 0) return '';
  
  const randomIndex = Math.floor(Math.random() * Math.min(sentences.length, 3));
  const sentence = sentences[randomIndex].trim();
  
  const questionTemplates = [
    `Can you explain ${sentence}?`,
    `What are the key principles behind ${sentence}?`,
    `How would you apply this concept in clinical practice: ${sentence}?`,
    `For your exam preparation, explain ${sentence}`,
  ];
  
  return questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
}