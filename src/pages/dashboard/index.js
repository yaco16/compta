import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import Error401 from '../../components/errors/Error401';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      session && setLoading(false);
    };
    checkSession();
  }, []);

  return (
    <div>
      {loading? <Error401 /> : <div>Dashboard</div>}
    </div>
  );
}
