import React from 'react';
import TicketCard from './TicketCard';

interface TicketBannerProps {
  tickets: Array<{
    _id: string;
    title: string;
    description: string;
    priority: number;
    progress: number;
    status: string;
    receiveNotifications: boolean;
  }>;
}

const TicketCardBanner: React.FC<TicketBannerProps> = ({ tickets }) => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {tickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketCardBanner;
