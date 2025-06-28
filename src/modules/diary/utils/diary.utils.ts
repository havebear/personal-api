import { generateExcerpt, extractTags } from '../../../utils/string.util';

export function generateDiaryExcerpt(content: string, maxLength: number = 150): string {
  return generateExcerpt(content, maxLength);
}

export function extractDiaryTags(content: string): string[] {
  return extractTags(content);
}

export function processDiaryContent(content: string): {
  processedContent: string;
  extractedTags: string[];
  excerpt: string;
} {
  const extractedTags = extractDiaryTags(content);
  const processedContent = content;
  const excerpt = generateDiaryExcerpt(content);

  return {
    processedContent,
    extractedTags,
    excerpt,
  };
}

export function mergeTags(existingTags: string[], newTags: string[]): string[] {
  const allTags = [...existingTags, ...newTags];
  return [...new Set(allTags)].filter(tag => tag.trim().length > 0);
}

export function validateDiaryDate(date: Date): boolean {
  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const oneYearFromNow = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  
  return date >= oneYearAgo && date <= oneYearFromNow;
} 