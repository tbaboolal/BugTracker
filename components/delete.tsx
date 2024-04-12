import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }: { id: any }) => {
    const router = useRouter();
    const deleteTicket = async () => {
        console.log("Deleting ticket...");
        try {
            const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                console.log("Ticket deleted successfully.");
                router.refresh();
                window.location.reload()
            } else {
                console.error("Failed to delete ticket. Status:", res.status);
            }
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    return (
        <button
            type="button"
            onClick={deleteTicket}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
            Delete Ticket
        </button>
    );
};

export default DeleteBlock;
