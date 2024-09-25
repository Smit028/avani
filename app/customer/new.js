import AddCustomerForm from '../components/AddCustomerForm';

export default function NewCustomerPage() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Add New Customer</h2>
      <AddCustomerForm />
    </div>
  );
}
