import {signIn} from 'next-auth/react';

export default function Error401() {
  return (
    <div>
      <div>You are not connected</div>
      <div>Please sign in or sign up</div>
      <button onClick={e => signIn('google')}>Sign in</button>
    </div>
  )
}