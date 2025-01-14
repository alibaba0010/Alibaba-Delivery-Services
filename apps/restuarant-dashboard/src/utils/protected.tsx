'use client';
import { redirect } from 'next/navigation';
// import useAuthenticated from '../hooks/useAuthenticated';

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = false;
  console.log('isAuthenticated :>> ', isAuthenticated);

  return isAuthenticated ? children : redirect('/login');
}
