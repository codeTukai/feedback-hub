import databaseConnection from "@/lib/dbConnected";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendEmailVerification";

export async function POST(request: Request) {
    await databaseConnection()
    try {

        const { username, email, password } = await request.json()

        const existingUserByVerified = await UserModel.findOne({ username })

        if (existingUserByVerified) {
            return Response.json({
                success: false,
                message: "user is exist with this username, try another username"
            }, { status: 400 })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        const existingUserByEmail = await UserModel.findOne({ email })

        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json({
                success: false,
                message: "User already verified with this email"
            },
                { status: 400 }
            )
            }else{
                const hashPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        } else {
            const hashingPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const createNewUser = new UserModel({
                username,
                email,
                password: hashingPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await createNewUser.save()
        }

        const sendVerificationCodeOnEmail = await sendVerificationEmail(
            username,
            email,
            verifyCode
        )

        if (!sendVerificationCodeOnEmail.success) {
            return Response.json({
                success: false,
                message: sendVerificationCodeOnEmail.message
            },
                { status: 500 }
            )
        }

        return Response.json({
            success: true,
            message: "User register successfully, Now verify you email"
        },
            { status: 201 })



    } catch (error) {
        console.log("Error while registering", error);
        return Response.json({
            success: false,
            message: "Error while registering"
        },
            {
                status: 500
            }
        )

    }
}