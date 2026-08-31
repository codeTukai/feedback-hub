import databaseConnection from "@/lib/dbConnected";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credential",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password"}
            },

            async authorize(credentials:any):Promise<any>{
                await databaseConnection()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {password:credentials.identifier},
                        ]
                    })

                    if (!user) {
                        throw new Error('user not found with this email or username')
                    }

                    if(!user.isVerified){
                        throw new Error('user not verified with this email')
                    }

                   const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
                   if (isCorrectPassword) {
                    return user
                   }else{
                    throw new Error('Incorrect Password')
                   }
                } catch (err:any) {
                    throw new Error(err)
                }
            }
        })


    ],
    pages:{
         signIn: '/auth/signin'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
    
}