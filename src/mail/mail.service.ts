import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOtpMail(to: string, otp: string) {
    await this.transporter.sendMail({
      from: `"AutoCart" <${process.env.EMAIL_FROM}>`,
      to,
      subject: 'AutoCart | OTP Verification',
      html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:30px;">
        <div style="max-width:520px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background:#0f172a; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:22px;">AutoCart</h1>
            <p style="color:#cbd5e1; margin:5px 0 0; font-size:13px;">
              Smart Vehicle Marketplace
            </p>
          </div>

          <!-- Body -->
          <div style="padding:30px; color:#334155;">
            <h2 style="margin-top:0; font-size:18px;">OTP Verification</h2>

            <p style="font-size:14px; line-height:1.6;">
              Hello,<br /><br />
              Use the OTP below to verify your email address on <strong>AutoCart</strong>.
              Please do not share this code with anyone.
            </p>

            <!-- OTP Box -->
            <div style="margin:25px 0; text-align:center;">
              <span style="
                display:inline-block;
                background:#e2e8f0;
                color:#0f172a;
                font-size:28px;
                letter-spacing:6px;
                padding:12px 24px;
                border-radius:6px;
                font-weight:bold;
              ">
                ${otp}
              </span>
            </div>

            <p style="font-size:13px; color:#64748b;">
              This OTP will expire in <strong>${process.env.OTP_EXPIRE_MINUTES} minutes</strong>.
            </p>

            <p style="font-size:13px; color:#64748b; margin-top:20px;">
              If you didn’t request this, you can safely ignore this email.
            </p>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

            <p style="font-size:12px; color:#94a3b8;">
              Thanks,<br />
              <strong>AutoCart Team</strong>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <p style="text-align:center; font-size:11px; color:#94a3b8; margin-top:15px;">
          © ${new Date().getFullYear()} AutoCart. All rights reserved.
        </p>
      </div>
    `,
    });
  }
}
