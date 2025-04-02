'use client'

import { useState } from 'react';
import { redirect } from 'next/navigation';

export default function Page() {
    const [isLogin , setIsLogin] = useState(true);

    if (isLogin) {
        redirect('/home/dashboard');
    } else {
        redirect('/login');
    }
  return null;
}
