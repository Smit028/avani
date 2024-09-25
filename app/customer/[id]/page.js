// app/customer/[id]/page.js
import { db } from '../../firebase/firebase'; // Adjust the path if necessary
import { doc, getDoc } from 'firebase/firestore';
import CustomerDetail from '../../components/CustomerDetails'; // Import the Client Component

const CustomerPage = async ({ params }) => {
  const { id } = params; // Get the customer ID from the URL
  let customer = null;
  let error = null;

  try {
    const docRef = doc(db, 'customers', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      customer = { id: docSnap.id, ...docSnap.data() };
    } else {
      error = 'No such customer!';
    }
  } catch (err) {
    error = 'Error fetching customer data.';
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!customer) return <p>Loading...</p>;

  return <CustomerDetail customer={customer} />; // Pass customer data to Client Component
};

export default CustomerPage;
