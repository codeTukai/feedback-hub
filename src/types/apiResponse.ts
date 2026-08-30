import { MessageProps } from "@/model/User";
export interface ApiResponse{
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean;
    showMessages?:Array<MessageProps>
}