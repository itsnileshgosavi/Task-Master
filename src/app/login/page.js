import React from 'react'
import Login from './Login';
import { getSession } from 'next-auth/react'

const LoginPage =async (context) => {
  const session = await getSession(context);
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <Login/>
  )
};

export default LoginPage;