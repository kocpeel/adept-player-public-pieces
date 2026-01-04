import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    
    // Sprawdź czy folder istnieje
    if (!fs.existsSync(audioDir)) {
      return NextResponse.json({ assets: [] });
    }

    // Przeczytaj pliki z folderu audio
    const files = fs.readdirSync(audioDir);
    
    const assets = files
      .filter((file) => {
        // Filtruj tylko pliki (nie foldery) i pliki audio/wideo
        const filePath = path.join(audioDir, file);
        const stat = fs.statSync(filePath);
        return stat.isFile();
      })
      .map((file) => ({
        name: file,
        path: file,
      }));

    return NextResponse.json({ assets });
  } catch (error) {
    console.error('Error listing assets:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', assets: [] },
      { status: 500 }
    );
  }
}

