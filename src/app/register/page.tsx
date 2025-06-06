'use client';

import React, { useState } from 'react';
import { prisma } from '@/lib/prisma';
const RegisterPage = async () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /*   const user = await prisma.user.create({
    data: {
      email,
      password_hash: password,
      created_at: new Date(),
      updated_at: new Date(),
    },
  }); */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    /*     await prisma.user.create({
      data: {
        email,
        password_hash: password,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    setIsSuccess(true); */
  };

  return (
    <div>
      <h1>Register</h1>
      {isSuccess && <p>User created successfully</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
