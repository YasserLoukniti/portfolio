// Geolocation service using free IP-API
export interface GeoInfo {
  country: string;
  countryCode: string;
  city: string;
  region: string;
}

// Parse user agent to extract device and browser info
export function parseUserAgent(ua?: string): { device: string; browser: string } {
  if (!ua) return { device: 'Unknown', browser: 'Unknown' };

  let device = 'Desktop';
  let browser = 'Unknown';

  // Detect device
  if (/mobile/i.test(ua)) {
    device = 'Mobile';
    if (/iphone/i.test(ua)) device = 'iPhone';
    else if (/android/i.test(ua)) device = 'Android';
    else if (/ipad/i.test(ua)) device = 'iPad';
  } else if (/tablet/i.test(ua) || /ipad/i.test(ua)) {
    device = 'Tablet';
  } else if (/macintosh/i.test(ua)) {
    device = 'Mac';
  } else if (/windows/i.test(ua)) {
    device = 'Windows';
  } else if (/linux/i.test(ua)) {
    device = 'Linux';
  }

  // Detect browser
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome/i.test(ua) && !/chromium/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  return { device, browser };
}

// Get geolocation from IP using ip-api.com (free, 45 req/min)
export async function getGeoFromIP(ip: string): Promise<GeoInfo | null> {
  // Skip local/private IPs
  if (ip === 'unknown' || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return {
      country: 'Local',
      countryCode: 'LC',
      city: 'Localhost',
      region: 'Dev',
    };
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city`, {
      signal: AbortSignal.timeout(3000), // 3s timeout
    });

    if (!response.ok) return null;

    const data = await response.json();

    if (data.status === 'success') {
      return {
        country: data.country || 'Unknown',
        countryCode: data.countryCode || '??',
        city: data.city || 'Unknown',
        region: data.regionName || '',
      };
    }

    return null;
  } catch (error) {
    console.error('[Geo] Failed to get location for IP:', ip, error);
    return null;
  }
}

// Country code to flag emoji
export function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
