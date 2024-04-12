"use client";

import Image from "next/image";
import SigninButton from "@/components/SignInButton";
import TicketCardBanner from "@/components/TicketCardBanner";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (error) {
    console.error("Failed to load tickets:", error);
    return null;
  }
};

export default function Home() {
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      (async () => {
        const fetchedData = await getTickets();
        if (fetchedData && fetchedData.tickets) {
          setTickets(fetchedData.tickets);
        }
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#ffd6eb' }}>
        <div className="text-center p-8 rounded-lg shadow-lg bg-white max-w-lg">
          <div className="flex justify-center"> 
            <img src="/roach.gif" width={96} height={96} alt="Bug Tracker Logo" />
          </div>
          <h1 className="font-comic font-bold text-5xl my-4">Welcome to Bug Tracker</h1>
          <p className="text-lg mb-8">The ultimate tool to manage and track software bugs. Log in to get started!</p>
          <SigninButton />
        </div>
      </div>
    );
  }

  // User is logged in and data is loaded
  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#ffd6eb' }}>
      <div className="text-center">
        <div className="flex items-center space-x-4 mb-8">
          <Image src="/roach.gif" width={48} height={48} alt="Bug Tracker Logo" />
          <h1 className="font-comic font-bold text-5xl">Bug Tracker</h1>
        </div>
        <p className="text-xl">Welcome back! Ready to squash some bugs?</p>
        <SigninButton />
        {loading ? <p>Loading tickets...</p> : <TicketCardBanner tickets={tickets} />}
      </div>
    </div>
  );
}
