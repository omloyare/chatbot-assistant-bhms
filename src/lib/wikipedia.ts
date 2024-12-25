import { sanitizeSearchTerm, cleanHtmlTags } from '../utils/stringUtils';

const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/w/api.php';

export interface WikiSearchResult {
  title: string;
  snippet: string;
  pageid: number;
}

export const searchWikipedia = async (term: string): Promise<WikiSearchResult[]> => {
  const sanitizedTerm = sanitizeSearchTerm(term);
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: `homeopathy ${sanitizedTerm}`,
    format: 'json',
    origin: '*',
    utf8: '1',
    srlimit: '3',
  });

  try {
    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    const data = await response.json();
    return data.query.search.map(result => ({
      ...result,
      snippet: cleanHtmlTags(result.snippet)
    }));
  } catch (error) {
    console.error('Wikipedia search error:', error);
    return [];
  }
};

export const getWikipediaExtract = async (pageId: number): Promise<string> => {
  const params = new URLSearchParams({
    action: 'query',
    pageids: pageId.toString(),
    prop: 'extracts',
    exintro: '1',
    format: 'json',
    origin: '*',
    utf8: '1',
  });

  try {
    const response = await fetch(`${WIKIPEDIA_API_BASE}?${params}`);
    const data = await response.json();
    const page = data.query.pages[pageId];
    return cleanHtmlTags(page.extract || '');
  } catch (error) {
    console.error('Wikipedia extract error:', error);
    return '';
  }
};