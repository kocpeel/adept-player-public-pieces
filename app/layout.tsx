import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adept Player - Public Pieces',
  description: 'Host assetów audio/wideo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}

