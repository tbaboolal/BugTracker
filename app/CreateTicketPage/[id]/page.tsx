import TicketForm from "@/components/TicketForm";

let TicketData={};
const CreateTicketPage = async (params: any) => {
    TicketData = {
        _id: "new",
    };
    return <TicketForm {...TicketData}/>;
}

export default CreateTicketPage;