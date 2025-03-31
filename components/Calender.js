"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Calender() {
  const router = useRouter();
  return (
    <div onClick={() => router.push('/calender-page')}>Calender</div>
  )
}
