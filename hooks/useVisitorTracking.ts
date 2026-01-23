import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_CHAT_API_URL || 'http://localhost:3050';

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch(`${API_URL}/visitor/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: location.pathname,
            referer: document.referrer || undefined,
          }),
        });
      } catch (error) {
        // Silently fail - don't break the app if tracking fails
        console.debug('Visitor tracking failed:', error);
      }
    };

    trackVisit();
  }, [location.pathname]);
};
