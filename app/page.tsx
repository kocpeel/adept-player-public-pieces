'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Asset {
  name: string;
  path: string;
}

export default function Home() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobierz listę assetów z API
    fetch('/api/list-assets')
      .then((res) => res.json())
      .then((data) => {
        setAssets(data.assets || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching assets:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Adept Player - Public Pieces
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Lista dostępnych assetów audio/wideo
        </p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Ładowanie assetów...</p>
        </div>
      ) : assets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Brak dostępnych assetów</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}>
          {assets.map((asset, index) => (
            <Link
              key={index}
              href={`/view/${encodeURIComponent(asset.path)}`}
              style={{
                display: 'block',
                padding: '1.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s',
                backgroundColor: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0070f3';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3 style={{ 
                margin: '0 0 0.5rem 0',
                fontSize: '1.1rem',
                color: '#333'
              }}>
                {asset.name}
              </h3>
              <p style={{ 
                margin: 0,
                fontSize: '0.9rem',
                color: '#666',
                wordBreak: 'break-word'
              }}>
                {asset.path}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

