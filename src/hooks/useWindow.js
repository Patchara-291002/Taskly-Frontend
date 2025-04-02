'use client'

import { useState, useEffect } from 'react';

export default function useWindowSize() {
  // กำหนดค่าเริ่มต้นเป็น undefined เพื่อป้องกัน hydration error
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // เรียกใช้งานครั้งแรกหลังจาก component mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}