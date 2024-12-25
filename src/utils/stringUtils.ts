export const sanitizeSearchTerm = (term: string): string => {
  return term.trim().toLowerCase().replace(/[^\w\s]/g, '');
};

export const extractKeywords = (text: string): string[] => {
  const commonWords = new Set([
    'and', 'or', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
    'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could',
    'a', 'an', 'this', 'that', 'these', 'those', 'it', 'its'
  ]);
  
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 2 && !commonWords.has(word));
};

export const cleanHtmlTags = (text: string): string => {
  return text
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
};

export const isQuestion = (text: string): boolean => {
  const questionWords = ['what', 'why', 'how', 'when', 'where', 'who', 'which', 'can', 'could'];
  const lowerText = text.toLowerCase();
  return questionWords.some(word => lowerText.startsWith(word)) || text.endsWith('?');
};