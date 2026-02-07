'use client';

import { useEffect, useRef } from 'react';

export default function BimmMarketApp() {
  const appInitialized = useRef(false);

  useEffect(() => {
    if (appInitialized.current) return;
    appInitialized.current = true;

    // Initialize the BIMM Market application
    if (typeof window !== 'undefined') {
      // Load the main application script from API route
      const script = document.createElement('script');
      script.src = '/api/app.js';
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        console.log('✅ BIMM Market app.js loaded successfully');
      };
      script.onerror = (e) => {
        console.error('❌ Failed to load app.js:', e);
      };
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
