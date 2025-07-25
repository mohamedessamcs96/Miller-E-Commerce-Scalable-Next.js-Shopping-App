// lib/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin'); // redirect to login
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
