export const shareToClipBoard = (url: string) => {
  navigator.clipboard.writeText(url);
};
