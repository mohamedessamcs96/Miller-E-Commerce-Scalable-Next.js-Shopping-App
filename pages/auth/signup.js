import { useRouter } from 'next/router';
import SignupForm from '../../components/Auth/SignupForm';

export default function Signup() {
  const router = useRouter();

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      name: form.username.value,
      email: form.email.value,
      password: form.password.value,
      isAdmin: form.isAdmin?.checked || false,
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || 'Signup failed');
        return;
      }

      console.log('Signup successful:', result);
      router.push('/auth/signin'); // Navigate to login
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <SignupForm onSubmit={handleSignup} />
      </div>
    </div>
  );
}
