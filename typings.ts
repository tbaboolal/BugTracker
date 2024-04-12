export type Ticket = {
    _id: string;
    title: string;
    description: string;
    priority: number;
    progress: number;
    status: string;
    receiveNotifications: boolean;
    __v: number;
};

