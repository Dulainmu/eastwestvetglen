import nodemailer from 'nodemailer';
import { format } from 'date-fns';

export async function sendAppointmentConfirmation(data: {
  to: string;
  appointmentDate: Date;
  petName: string;
  serviceName: string;
  clinicName: string;
  clinicAddress: string;
  vetName: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"VetFlow" <noreply@vetflow.com>',
      to: data.to,
      subject: `Appointment Confirmed: ${data.petName} on ${format(data.appointmentDate, 'MMM d, yyyy')}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #111827; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
              .detail { margin: 15px 0; padding-bottom: 15px; border-bottom: 1px solid #f3f4f6; }
              .detail:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #4b5563; display: block; margin-bottom: 4px; }
              .value { color: #111827; }
              .footer { text-align: center; color: #9ca3af; font-size: 14px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin:0;">Appointment Confirmed!</h1>
              </div>
              <div class="content">
                <p>Hi there,</p>
                <p>Great news! Your appointment for <strong>${data.petName}</strong> has been successfully booked.</p>
                
                <div class="detail">
                  <span class="label">📅 Date & Time</span>
                  <span class="value">${format(data.appointmentDate, 'EEEE, MMMM d, yyyy')} at ${format(data.appointmentDate, 'h:mm a')}</span>
                </div>
                
                <div class="detail">
                  <span class="label">📍 Location</span>
                  <span class="value">${data.clinicName}<br>${data.clinicAddress}</span>
                </div>
                
                <div class="detail">
                  <span class="label">🩺 Service</span>
                  <span class="value">${data.serviceName}</span>
                </div>
                
                <div class="detail">
                  <span class="label">👨‍⚕️ Veterinarian</span>
                  <span class="value">${data.vetName}</span>
                </div>
                
                <p style="margin-top: 20px;">Please arrive 5 minutes early for check-in. We look forward to seeing you!</p>
              </div>
              
              <div class="footer">
                <p>Need to reschedule? Please contact the clinic directly.</p>
                <p>© ${new Date().getFullYear()} ${data.clinicName}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
}
