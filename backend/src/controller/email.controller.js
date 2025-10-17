import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API);

export const sendSignupEmail = async (email, username) => {
  if (!process.env.RESEND_API) {
    throw new Error("RESEND_API environment variable is not defined");
  }
  try {
    const message = await resend.emails.send({
      from: "ChatX <no-reply@pawpick.store>",
      subject: "Welcome to ChatX! 🎉",
      to: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 30px; text-align: center; background-color: #000000; border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                        ChatX
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                        Welcome, ${username}! 👋
                      </h2>
                      
                      <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Thank you for signing up to ChatX. We're excited to have you on board and can't wait for you to experience seamless conversations with your friends, family, and colleagues.
                      </p>
                      
                      <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Your account is ready to go! Start connecting with others instantly and enjoy features designed to make your conversations better.
                      </p>
                      
                      <!-- CTA Button -->
                      <table role="presentation" style="margin: 0 0 32px;">
                        <tr>
                          <td style="border-radius: 6px; background-color: #000000;">
                            <a href="#" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                              Start Chatting
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Features Section -->
                      <div style="background-color: #f8f8f8; border-radius: 6px; padding: 24px; margin-bottom: 24px;">
                        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #1a1a1a;">
                          What you can do with ChatX:
                        </h3>
                        
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="font-size: 20px; margin-right: 12px;">💬</span>
                              <span style="font-size: 15px; color: #4a4a4a; line-height: 1.6;">Send instant messages to anyone, anywhere</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="font-size: 20px; margin-right: 12px;">👥</span>
                              <span style="font-size: 15px; color: #4a4a4a; line-height: 1.6;">Create group chats and collaborate with teams</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="font-size: 20px; margin-right: 12px;">📁</span>
                              <span style="font-size: 15px; color: #4a4a4a; line-height: 1.6;">Share files, photos, and videos effortlessly</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="font-size: 20px; margin-right: 12px;">🔒</span>
                              <span style="font-size: 15px; color: #4a4a4a; line-height: 1.6;">Stay secure with end-to-end encryption</span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <p style="margin: 0 0 8px; font-size: 15px; line-height: 1.6; color: #4a4a4a;">
                        Need help getting started? Check out our <a href="#" style="color: #000000; font-weight: 600; text-decoration: none;">Help Center</a> or reach out to our support team anytime.
                      </p>
                      
                      <p style="margin: 24px 0 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Cheers,<br />
                        <span style="font-weight: 600; color: #1a1a1a;">The ChatX Team</span>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #f8f8f8; border-radius: 0 0 8px 8px; text-align: center;">
                      <p style="margin: 0 0 8px; font-size: 14px; color: #737373;">
                        © 2025 ChatX. All rights reserved.
                      </p>
                      <p style="margin: 0; font-size: 13px; color: #999999;">
                        You received this email because you signed up for ChatX.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return { success: true, message };
  } catch (error) {
    console.error("❌ Failed to send signup email:", error);
    return { success: false, error: error.message };
  }
};
