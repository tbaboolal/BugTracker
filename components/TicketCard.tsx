import React, { useState } from 'react';
import EditTicketForm from './EditForm';

interface TicketProps {
    ticket: {
        _id: string;
        title: string;
        description: string;
        priority: number;
        progress: number;
        status: string;
        receiveNotifications: boolean;
    };
}

const TicketCard: React.FC<TicketProps> = ({ ticket }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const priorityLabel = (num: number) => {
        switch (num) {
            case 1: return "Low";
            case 2: return "Medium";
            case 3: return "High";
            case 4: return "Urgent";
            case 5: return "Immediate";
            default: return "Unknown";
        }
    };

    if (isEditing) {
        return <EditTicketForm ticket={ticket} />;
    }

    return (
        <div className="m-4 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ticket.title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ticket.description}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Priority: {priorityLabel(ticket.priority)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Progress: {ticket.progress}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Status: {ticket.status}</p>
            {ticket.receiveNotifications && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Notifications Enabled
                </span>
            )}
            <div className="mt-4">
                <button type="button" onClick={handleEditClick} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Edit Ticket
                </button>
            </div>
        </div>
    );
};

export default TicketCard;
