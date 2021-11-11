import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import Spinner from '../../components/Spinner';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      session ? setLoading(false) : signIn('google');
    };
    checkSession();
  }, []);

  return (
    <div>
      {loading? <Spinner /> : <div>Dashboard</div>}
    </div>
  );
}
