import { useRouter } from 'next/router';
import SigninForm from '../../components/Auth/SigninForms';

export default function Signin() {
  const router = useRouter();

  const handleSignin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || 'Signin failed');
        return;
      }

      console.log('Signin success:', result);

      // Optionally store token or user data
      // localStorage.setItem('token', result.token);

      router.push('/'); // Redirect to home or dashboard
    } catch (error) {
      console.error('Signin error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <SigninForm onSubmit={handleSignin} />
      </div>
    </div>
  );
}
