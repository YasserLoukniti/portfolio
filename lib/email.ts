import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'yass_official@outlook.fr';
const FROM_EMAIL = process.env.FROM_EMAIL || 'notifications@resend.dev'; // Utilise ton domaine verifie sur Resend

interface ChatNotificationData {
  sessionId: string;
  message: string;
  userAgent?: string;
  ip?: string;
  location?: {
    city?: string;
    country?: string;
  };
}

export async function sendChatNotification(data: ChatNotificationData): Promise<boolean> {
  // Ne pas envoyer si c'est localhost
  if (data.ip === '127.0.0.1' || data.ip === '::1' || data.ip === 'localhost' || data.ip === 'unknown') {
    console.log('[Email] Skipped for localhost visitor');
    return true;
  }

  if (!process.env.RESEND_API_KEY) {
    console.log('[Email] RESEND_API_KEY not configured');
    return false;
  }

  try {
    const locationText = data.location?.city
      ? `${data.location.city}, ${data.location.country}`
      : 'Inconnu';

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `💬 Nouveau message sur ton portfolio`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366F1;">Nouveau message reçu !</h2>

          <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 0; font-size: 16px; color: #333;">
              "${data.message}"
            </p>
          </div>

          <table style="font-size: 14px; color: #666;">
            <tr>
              <td style="padding: 4px 16px 4px 0;"><strong>Session:</strong></td>
              <td>${data.sessionId}</td>
            </tr>
            <tr>
              <td style="padding: 4px 16px 4px 0;"><strong>Localisation:</strong></td>
              <td>${locationText}</td>
            </tr>
          </table>

          <p style="margin-top: 24px;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://yasserloukniti.com'}/dashboard"
               style="background: #6366F1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
              Voir le dashboard
            </a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('[Email] Failed to send:', error);
      return false;
    }

    console.log('[Email] Notification sent successfully');
    return true;
  } catch (error) {
    console.error('[Email] Error:', error);
    return false;
  }
}
