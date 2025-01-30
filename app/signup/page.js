import Dashboard from '@/components/Dashboard';
import Main from '@/components/Main';
import Signup from '@/components/Signup';
import React from 'react'

export default function page() {
    const isAunthenticated = false;
    let children = <Signup />;

    if (isAunthenticated) {
        children = <Dashboard />;
    }
  return <Main>{children}</ Main>;
}
