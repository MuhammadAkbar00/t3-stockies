export const formatImageSource = (src: string | null): string | null => {
  // If src is a relative path and doesn't start with a leading slash, add one
  if (
    src &&
    !src.startsWith("/") &&
    !src.startsWith("http://") &&
    !src.startsWith("https://")
  ) {
    return `/${src}`;
  }

  // Otherwise, return the original src
  return src;
};
