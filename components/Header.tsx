'use client';

import Link from 'next/link';
import Image from 'next/image';
import SigninButton from './SignInButton';
import { useSession, SessionProvider  } from 'next-auth/react';


function Header() {
  const { data: session } = useSession();

  return (
    <header className='fixed w-full z-50 top-0 flex items-center justify-between p-5'>
      <div className='flex items-center space-x-2'>
        {session && (
          <Link href="/CreateTicketPage/new">
            <p>create ticket</p>
          </Link>
        )}
      </div>
    </header>
  );
}

export default function HeaderWithSession() {
  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  );
}

