import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'BugFixer!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-white dark:bg-[#1A1C29]'>
        
        
          <Providers>
            {children}
            
          </Providers>
          <Header></Header>
  
        
      </body>
    </html>
  );
}
