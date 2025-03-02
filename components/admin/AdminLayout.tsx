'use client';

import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 md:ml-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 w-full">
          {children}
        </div>
      </div>
    </div>
  );
} 