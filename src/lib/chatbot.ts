import { ChatState, createInitialState } from './chat/state';
import { generateTopicResponse, generateStudyQuestion, generateSummary } from './chat/responseGenerator';
import { analyzeUserResponse, generateFeedback } from './chat/responseAnalyzer';
import { searchWikipedia, getWikipediaExtract } from './wikipedia';
import { isQuestion } from '../utils/stringUtils';

let state: ChatState = createInitialState();

export const generateResponse = async (userMessage: string) => {
  try {
    // Initial greeting
    if (!state.topic && !state.currentQuestion && !userMessage) {
      return {
        content: `Hello! 👋 I'm your BHMS study assistant. I can help you study any homeopathy topic. What would you like to learn about today?`
      };
    }

    // Handle user's message
    const isUserAsking = isQuestion(userMessage);
    
    // If user is asking about a new topic
    if (isUserAsking || !state.topic) {
      const response = await generateTopicResponse(userMessage, state);
      state.lastSearchResults = response.sources;
      state.topic = userMessage;
      
      if (response.sources.length > 0) {
        const extract = await getWikipediaExtract(response.sources[0].pageid);
        state.context = [extract];
        state.currentQuestion = generateStudyQuestion(extract);
      }
      
      return response;
    }

    // Handle user's answer to a question
    if (state.currentQuestion) {
      const quality = analyzeUserResponse(userMessage);
      const feedback = generateFeedback(quality);
      
      if (quality === 'unknown') {
        const summary = generateSummary(state.context[0]);
        return {
          content: `${feedback}\n\n${summary}\n\nWould you like to try another question about this topic?`,
          sources: state.lastSearchResults
        };
      }
      
      // Generate next question
      const nextQuestion = generateStudyQuestion(state.context[0]);
      state.currentQuestion = nextQuestion;
      
      return {
        content: `${feedback}\n\n${nextQuestion}`,
        sources: state.lastSearchResults
      };
    }

    // Default response for unclear input
    return {
      content: "I'm not sure what you'd like to know. Could you please ask a specific question about homeopathy or tell me what topic you'd like to study?",
      sources: []
    };

  } catch (error) {
    console.error('Error generating response:', error);
    state = createInitialState();
    return {
      content: "I encountered an error. Let's start fresh - what would you like to learn about?"
    };
  }
};