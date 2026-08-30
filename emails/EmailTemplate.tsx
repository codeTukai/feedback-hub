import * as React from "react";

interface EmailTemplateProps {
  otp: string;
  username: string
}

export function EmailTemplate({ otp, username }: EmailTemplateProps) {
  return (
    <div>
      <h1>Hii, {username} Verify your email</h1>

      <p>Thank you for signing up.</p>

      <p>Your verification code is:</p>

      <h2>{otp}</h2>

      <p>
        Please enter this code to verify your email address.
      </p>
    </div>
  );
}