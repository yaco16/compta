import {signIn} from 'next-auth/react';

export default function Error401() {
  return (
    <div>
      <div>You are not connected</div>
      <div>Please login or sign up</div>
      <button onClick={e => signIn('google')}>Login</button>
    </div>
  )
}