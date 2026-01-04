import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const assetPath = params.path.join('/');
    const filePath = path.join(process.cwd(), 'public', 'audio', assetPath);
    
    // Sprawdź czy plik istnieje
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    // Przeczytaj plik
    const fileBuffer = fs.readFileSync(filePath);
    const fileStat = fs.statSync(filePath);
    
    // Określ content type na podstawie rozszerzenia
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    // Obsługa obrazów (dla maili - muszą być inline)
    if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.webp') {
      contentType = 'image/webp';
    } else if (ext === '.svg') {
      contentType = 'image/svg+xml';
    } else if (ext === '.ico') {
      contentType = 'image/x-icon';
    }
    // Obsługa audio/wideo
    else if (ext === '.mp4') {
      contentType = 'video/mp4';
    } else if (ext === '.mp3') {
      contentType = 'audio/mpeg';
    } else if (ext === '.webm') {
      contentType = 'video/webm';
    }

    // Przygotuj nagłówki
    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Length': fileStat.size.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    };

    // Dla obrazów ustaw Content-Disposition: inline (aby działały w mailach)
    // Dla innych plików nie ustawiamy Content-Disposition, co oznacza inline domyślnie
    if (contentType.startsWith('image/')) {
      headers['Content-Disposition'] = 'inline';
    }

    // Zwróć plik z odpowiednimi nagłówkami (CORS dla użycia na innych stronach)
    return new NextResponse(fileBuffer, {
      headers,
    });
  } catch (error) {
    console.error('Error serving asset:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

