export default function CustomerCard({ customer }) {
    return (
      <div className="p-4 border rounded-md">
        <h3 className="text-xl font-bold">{customer.name}</h3>
        <p>Deadline: {new Date(customer.deadline.seconds * 1000).toLocaleDateString()}</p>
        <p>Price: ${customer.price}</p>
        {/* Add more fields like description or status if necessary */}
      </div>
    );
  }
  