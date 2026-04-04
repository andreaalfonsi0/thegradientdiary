export default function getReadingTime(body: string): number {
  const wordsPerMinute = 200;
  // Remove markdown symbols and HTML tags, then split by whitespace
  const text = body.replace(/[*#`_]/g, '').replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}