import databaseConnection from "@/lib/dbConnected";
import userModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendEmailVerification";

export async function POST(request:Request, response:Response) {
    try {
        
    } catch (error) {
        console.log("Error while registering", error);
        return Response.json({
            success: false,
            message:"Error while registering"
            
        },
        {
                status: 500
        }
    )
        
    }
}