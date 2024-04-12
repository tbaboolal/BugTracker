import Ticket from "../../model/Ticket";
import { NextResponse } from "next/server";

export async function POST(req: any){
    try {
        const ticketData = await req.json()
        const formData = ticketData.formData; 
        await Ticket.create(formData)

        return NextResponse.json({message: "Ticket Data Created"}, {status:201})

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status:500})
    }
}

export async function GET(){
    try{
        const tickets = await Ticket.find();
        return NextResponse.json({tickets}, {status:201})
    } catch(error){
        return NextResponse.json({message:"Error",error}, {status: 500})
    }
}
