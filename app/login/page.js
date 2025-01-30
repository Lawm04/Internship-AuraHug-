import Dashboard from '@/components/Dashboard';
import Login from '@/components/Login';
import Main from '@/components/Main';
import React from 'react'

export default function page() {
    const isAunthenticated = false;

    let children = <Login/>;

    if (isAunthenticated) {
        children = <Dashboard />;
    }
  return <Main>{children}</Main>;
}
