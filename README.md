# Adept Player - Public Pieces

Aplikacja Next.js hostująca assety audio/wideo na Vercel.

## Funkcjonalności

- **Strona główna** (`/`) - lista wszystkich assetów z folderu `public/audio/`
- **Wyświetlanie assetu** (`/view/[asset]`) - strona z odtwarzaczem audio/wideo
- **Bezpośredni dostęp do assetów** (`/assets/[asset]`) - bezpośredni URL do pliku, gotowy do użycia na innych stronach

## Struktura URL

- `domena/` - strona główna z listą assetów
- `domena/view/[nazwa-pliku]` - strona z odtwarzaczem
- `domena/assets/[nazwa-pliku]` - bezpośredni link do pliku (dla użycia na innych stronach)

## Dodawanie nowych assetów

Wystarczy dodać pliki audio/wideo do folderu `public/audio/`. Po redeploymencie automatycznie pojawią się na liście.
