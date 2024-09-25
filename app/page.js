"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import CustomerList from './components/CustomerList';

export default function HomePage() {
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Link 
          href="/customer/"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add New Customer
        </Link>
      </header>
      <CustomerList showCompleted={showCompleted} />
    </div>
  );
}
