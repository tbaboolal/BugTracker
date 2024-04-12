"use client"
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

interface TicketData {
    _id: string;  // Ensure you include the ID for updating purposes.
    title: string;
    description: string;
    priority: number;
    progress: number;
    status: string;
    receiveNotifications: boolean;
}

interface EditTicketFormProps {
    ticket: TicketData;
}

const EditTicketForm: React.FC<EditTicketFormProps> = ({ ticket }) => {
    const router = useRouter();

    console.log(ticket._id);

    const [formData, setFormData] = useState({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        progress: ticket.progress,
        status: ticket.status,
        receiveNotifications: ticket.receiveNotifications,
    });

    // Update form data whenever ticket prop changes
    useEffect(() => {
        setFormData({
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            progress: ticket.progress,
            status: ticket.status,
            receiveNotifications: ticket.receiveNotifications,
        });
    }, [ticket]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`/api/Tickets/${ticket._id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ formData }),
          });
          if (!res.ok) {
            throw new Error("Failed to update ticket");
          }
        
        router.refresh();  // Refresh the current page to reflect changes
        window.location.reload()
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, type, checked } = target;
        let newValue: string | number | boolean = type === 'checkbox' || type === 'radio' ? parseInt(target.value, 10) : target.value;
        newValue = type === 'checkbox' ? checked : newValue;
    
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
      };

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="p-10 bg-white shadow-lg rounded-lg max-w-4xl w-full">
                <h3 className="text-2xl font-bold text-center mb-6">Edit Ticket</h3>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={handleChange}
                        required
                        value={formData.title}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={handleChange}
                        required
                        value={formData.description}
                        rows={5}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <fieldset className="mb-4">
                    <legend className="text-gray-700 text-sm font-bold mb-2">Priority</legend>
                    <div className="flex space-x-2 justify-start">
                        {Array.from({ length: 5 }, (_, i) => (
                            <div key={i + 1} className="flex items-center">
                                <input
                                    id={`priority-${i + 1}`}
                                    name="priority"
                                    type="radio"
                                    onChange={handleChange}
                                    value={i + 1}
                                    checked={formData.priority === i + 1}
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <label htmlFor={`priority-${i + 1}`} className="ml-2 text-gray-700">{i + 1}</label>
                            </div>
                        ))}
                    </div>
                </fieldset>
                <div className="mb-4">
                    <label htmlFor="progress" className="block text-gray-700 text-sm font-bold mb-2">Progress</label>
                    <input
                        type="range"
                        id="progress"
                        name="progress"
                        min="0"
                        max="100"
                        onChange={handleChange}
                        value={formData.progress}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                    <select
                        id="status"
                        name="status"
                        onChange={handleChange}
                        value={formData.status}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        <option value="not started">Not Started</option>
                        <option value="started">Started</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="notify">
                        <input
                            type="checkbox"
                            id="notify"
                            name="receiveNotifications"
                            checked={formData.receiveNotifications}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Notify me</span>
                    </label>
                </div>
                <button type="submit" className="btn max-w-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Ticket</button>
            </form>
        </div>
    );
};

export default EditTicketForm;
