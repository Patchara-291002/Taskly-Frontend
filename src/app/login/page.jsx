'use client'

import React from 'react';

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
}
