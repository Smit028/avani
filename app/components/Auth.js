// AuthForm.js
import { useState } from 'react';
import { auth } from './firebase'; // Adjust the import path as necessary
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Logged in successfully!');
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Account created successfully!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="underline text-blue-600"
      >
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </button>
    </form>
  );
};

export default AuthForm;
