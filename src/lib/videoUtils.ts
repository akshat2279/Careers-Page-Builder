/**
 * Converts various video URLs to their embeddable format
 * @param url - The video URL to convert
 * @returns Embed-ready URL or original URL if not recognized
 */
export function getEmbedUrl(url: string): string {
  if (!url) return url;

  try {
    const urlObj = new URL(url);
    
    // YouTube URLs
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      let videoId = '';
      
      // Handle youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
        videoId = urlObj.searchParams.get('v') || '';
      }
      // Handle youtu.be/VIDEO_ID
      else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      }
      // Handle youtube.com/embed/VIDEO_ID (already embed format)
      else if (urlObj.pathname.startsWith('/embed/')) {
        return url;
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Vimeo URLs
    if (urlObj.hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').filter(Boolean).pop();
      if (videoId && !urlObj.pathname.includes('/video/')) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
      // Already in embed format
      if (urlObj.hostname === 'player.vimeo.com') {
        return url;
      }
    }
    
    // Loom URLs
    if (urlObj.hostname.includes('loom.com')) {
      if (urlObj.pathname.includes('/share/')) {
        const videoId = urlObj.pathname.split('/share/')[1];
        return `https://www.loom.com/embed/${videoId}`;
      }
      // Already in embed format
      if (urlObj.pathname.includes('/embed/')) {
        return url;
      }
    }
    
    // Wistia URLs
    if (urlObj.hostname.includes('wistia.com')) {
      // Extract video ID and convert to embed format
      const match = url.match(/medias\/([a-zA-Z0-9]+)/);
      if (match) {
        return `https://fast.wistia.net/embed/iframe/${match[1]}`;
      }
    }
    
    // Dailymotion URLs
    if (urlObj.hostname.includes('dailymotion.com')) {
      const videoId = urlObj.pathname.split('/video/')[1]?.split('_')[0];
      if (videoId) {
        return `https://www.dailymotion.com/embed/video/${videoId}`;
      }
    }
    
  } catch (error) {
    console.error('Error parsing video URL:', error);
  }
  
  // Return original URL if not recognized or error occurred
  return url;
}

/**
 * Checks if a URL points to a direct video file (e.g., S3, CDN)
 * @param url - The URL to check
 * @returns True if it's a direct video file URL
 */
export function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'];
  const lowerUrl = url.toLowerCase();
  
  return videoExtensions.some(ext => lowerUrl.includes(ext));
}
