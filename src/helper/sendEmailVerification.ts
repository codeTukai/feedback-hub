import { resend } from "@/lib/resend";
import { EmailTemplate } from "../../emails/EmailTemplate";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string

): Promise<ApiResponse> {
     try {
     await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'feedback message || Verification code',
      react: EmailTemplate(
        {
        username, 
        otp:verifyCode
    }
    )
    });

    return {success: true, message: "Send verification email is successfully done"}

  } catch (error) {
    console.log("Error While Verified Email", error);
    return {success: false, message: "Failed to send verification email"}
    
  }
}