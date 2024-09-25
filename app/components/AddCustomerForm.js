'use client'
import { useState } from 'react';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const AddCustomerForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [todayDate] = useState(new Date().toLocaleDateString());
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false); // Default status is 'Incomplete'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !dueDate) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      // Store customer data in Firestore
      await addDoc(collection(db, 'customers'), {
        name,
        description,
        price: parseFloat(price), // Store price as a number
        createdDate: todayDate,
        dueDate,
        completed,
      });

      setSuccessMessage('Customer added successfully!');
      setError('');
      setName('');
      setDescription('');
      setPrice('');
      setDueDate('');
      setCompleted(false); // Reset status to 'Incomplete'

    } catch (error) {
      console.error('Error adding customer:', error);
      setError('Error saving customer data. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium text-black">Customer Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border border-gray-300 p-2 rounded-md w-full text-black" 
          placeholder="Enter customer name"
        />
      </div>

      <div>
        <label className="block font-medium text-black">Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border border-gray-300 p-2 rounded-md w-full text-black" 
          placeholder="Enter description"
        />
      </div>

      <div>
        <label className="block font-medium text-black">Price</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="border border-gray-300 p-2 rounded-md w-full text-black" 
          placeholder="Enter price"
        />
      </div>

      <div>
        <label className="block font-medium text-black">Today’s Date</label>
        <input 
          type="text" 
          value={todayDate} 
          readOnly 
          className="border border-gray-300 p-2 rounded-md w-full bg-gray-100 text-black" 
        />
      </div>

      <div>
        <label className="block font-medium text-black">Due Date</label>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          className="border border-gray-300 p-2 rounded-md w-full text-black" 
        />
      </div>

      <div>
        <label className="block font-medium text-black">Completed Status</label>
        <select 
          value={completed} 
          onChange={(e) => setCompleted(e.target.value === 'true')} 
          className="border border-gray-300 p-2 rounded-md w-full text-black"
        >
          <option value={false}>Incomplete</option>
          <option value={true}>Completed</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Add Customer
      </button>
    </form>
  );
};

export default AddCustomerForm;
