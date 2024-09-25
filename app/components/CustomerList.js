import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Adjust the path if necessary
import { collection, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [showCompleted, setShowCompleted] = useState(null); // State for filtering (null means show all)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'customers'), (snapshot) => {
      const customerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(customerData);
    });

    return () => unsubscribe();
  }, []);

  // Filter customers based on search query and completion state
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (showCompleted === null || customer.completed === showCompleted) // showCompleted null means show all
  );

  // Sort incomplete customers by deadline
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (showCompleted === false) { // Only sort if we're viewing incomplete customers
      const deadlineA = a.dueDate ? new Date(a.dueDate) : Infinity; // Handle no deadline scenario
      const deadlineB = b.dueDate ? new Date(b.dueDate) : Infinity; // Handle no deadline scenario
      return deadlineA - deadlineB; // Ascending order
    }
    return 0; // No sorting for completed customers
  });

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4">
        <input 
          type="text"
          placeholder="Search by customer name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <button
          className={`px-4 py-2 mr-2 rounded-md ${showCompleted === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowCompleted(null)}
        >
          All
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded-md ${showCompleted === false ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowCompleted(false)}
        >
          Incomplete
        </button>
        <button
          className={`px-4 py-2 rounded-md ${showCompleted === true ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowCompleted(true)}
        >
          Completed
        </button>
      </div>

      {/* Customer List */}
      <ul>
        {sortedCustomers.length > 0 ? (
          sortedCustomers.map(customer => (
            <Link key={customer.id} href={`/customer/${customer.id}`}>
              <div className="cursor-pointer p-4 border rounded-lg hover:bg-gray-100">
                <p><strong>Name:</strong> {customer.name}</p>
                <p>
                  <strong>Deadline:</strong> {customer.dueDate ? new Date(customer.dueDate).toLocaleDateString() : 'N/A'}
                </p>
                <p><strong>Price:</strong> {customer.price}</p>
                <p><strong>Description:</strong> {customer.description}</p>
                <p><strong>Completed:</strong> {customer.completed ? 'Yes' : 'No'}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No customers found.</p> // Message if no matching customers
        )}
      </ul>
    </div>
  );
};

export default CustomerList;
