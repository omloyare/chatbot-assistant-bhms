import { extractKeywords } from '../../utils/stringUtils';

export type ResponseQuality = 'unknown' | 'partial' | 'good';

export function analyzeUserResponse(response: string): ResponseQuality {
  const keywords = extractKeywords(response.toLowerCase());
  const wordCount = response.split(/\s+/).length;
  
  // Check for explicit expressions of not knowing
  if (response.toLowerCase().includes("don't know") || 
      response.toLowerCase().includes("not sure") ||
      response.toLowerCase().includes("can you explain") ||
      response.toLowerCase().includes("i don't understand")) {
    return 'unknown';
  }
  
  // Check for question-like responses
  if (response.includes('?')) {
    return 'unknown';
  }
  
  // Evaluate response quality
  if (wordCount < 10 || keywords.length < 2) {
    return 'partial';
  }
  
  if (wordCount >= 30 && keywords.length >= 4) {
    return 'good';
  }
  
  return 'partial';
}

export function generateFeedback(quality: ResponseQuality): string {
  switch (quality) {
    case 'good':
      return "Excellent answer! You've demonstrated a good understanding of the concept.";
    case 'partial':
      return "Good start! Let's explore this topic a bit more deeply.";
    case 'unknown':
      return "No problem! Let me help you understand this better.";
    default:
      return "Let's continue exploring this topic.";
  }
}