'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function AssetViewPage() {
  const params = useParams();
  const [assetPath, setAssetPath] = useState<string>('');
  const [assetName, setAssetName] = useState<string>('');

  useEffect(() => {
    if (params.path) {
      const pathArray = Array.isArray(params.path) ? params.path : [params.path];
      const fullPath = pathArray.join('/');
      setAssetPath(fullPath);
      setAssetName(decodeURIComponent(pathArray[pathArray.length - 1]));
    }
  }, [params]);

  if (!assetPath) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Ładowanie...</p>
      </div>
    );
  }

  const assetUrl = `/assets/${encodeURIComponent(assetPath)}`;
  const isVideo = assetPath.toLowerCase().endsWith('.mp4') || 
                  assetPath.toLowerCase().endsWith('.webm');

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Link 
        href="/"
        style={{
          display: 'inline-block',
          marginBottom: '2rem',
          color: '#0070f3',
          textDecoration: 'none',
          fontSize: '1rem'
        }}
      >
        ← Powrót do listy
      </Link>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '1.5rem',
          wordBreak: 'break-word'
        }}>
          {assetName}
        </h1>

        {isVideo ? (
          <video
            controls
            style={{
              width: '100%',
              maxWidth: '100%',
              borderRadius: '8px',
              backgroundColor: '#000'
            }}
            src={assetUrl}
          >
            Twoja przeglądarka nie obsługuje odtwarzacza wideo.
          </video>
        ) : (
          <audio
            controls
            style={{
              width: '100%',
              marginTop: '1rem'
            }}
            src={assetUrl}
          >
            Twoja przeglądarka nie obsługuje odtwarzacza audio.
          </audio>
        )}

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>URL assetu (do użycia na innych stronach):</p>
          <code style={{ 
            display: 'block',
            padding: '0.5rem',
            backgroundColor: '#fff',
            borderRadius: '4px',
            wordBreak: 'break-all',
            fontSize: '0.9rem'
          }}>
            {typeof window !== 'undefined' ? window.location.origin + assetUrl : assetUrl}
          </code>
        </div>
      </div>
    </div>
  );
}

