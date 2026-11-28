/** Lấy mã video từ link YouTube thường, youtu.be, embed hoặc shorts. */
export function youtubeId(input: string | undefined | null): string | null {
  if (!input) return null;
  const value = input.trim();
  if (!value) return null;
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return match[1];
  }
  if (/^[\w-]{11}$/.test(value)) return value;
  return null;
}

export function youtubeEmbedUrl(input: string | undefined | null): string | null {
  const id = youtubeId(input);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
