
'use client'; // Ensure this file is treated as a Client Component

import React from 'react';
import { usePathname } from 'next/navigation';
import './globals.css'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

 

  return (
    <html lang="en">
      <body className="flex ">
        <div className='w-full'>
            <main className="child ">{children}</main>
        
        </div>
      </body>
    </html>
  );
};

export default Layout;                                                             
    
                                                                                                                 