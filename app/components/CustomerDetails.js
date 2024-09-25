"use client"; // Indicate this is a client component

import { useState } from 'react';
import { db } from '../firebase/firebase'; // Adjust the path if necessary
import { doc, updateDoc } from 'firebase/firestore';
import { differenceInDays, parseISO } from 'date-fns';

const CustomerDetail = ({ customer }) => {
  const [completed, setCompleted] = useState(customer.completed);

  const handleComplete = async () => {
    try {
      const docRef = doc(db, 'customers', customer.id);
      await updateDoc(docRef, { completed: true }); // Update Firestore
      setCompleted(true); // Update local state
      alert('Customer marked as complete!'); // Confirm success
    } catch (err) {
      console.error('Error updating customer:', err);
      alert('Error updating customer. Check console for details.'); // Alert on error
    }
  };

  // Calculate how many days remaining till due date
  const today = new Date();
  const dueDate = customer.dueDate ? parseISO(customer.dueDate) : null;
  const daysLeft = dueDate ? differenceInDays(dueDate, today) : 'N/A';

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold">{customer.name}</h2>
      <p><strong>Added Date (Today):</strong> {customer.addedDate || 'N/A'}</p>
      <p><strong>Due Date:</strong> {customer.dueDate || 'N/A'}</p>
      <p><strong>Days Until Due:</strong> {daysLeft !== 'N/A' ? `${daysLeft} days` : 'N/A'}</p>
      <p><strong>Price:</strong> {customer.price}</p>
      <p><strong>Description:</strong> {customer.description}</p>
      <p><strong>Completed:</strong> {completed ? 'Yes' : 'No'}</p>
      
      {!completed && (
        <button 
          onClick={handleComplete} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default CustomerDetail;
