
import Ticket from "@/app/model/Ticket";
import { NextResponse } from "next/server";
type Props = {
  params: {
    id: string;
  };
}
export async function PUT(req: any,   {params: { id }}: Props) {
    try {
      console.log(id)
  
      const body = await req.json();
      const ticketData = body.formData;
  
      const updateTicketData = await Ticket.findByIdAndUpdate(id, {
        ...ticketData,
      });

      console.log("put ran")
      console.log(updateTicketData)
  
      return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }