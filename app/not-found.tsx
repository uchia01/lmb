import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ background: '#080808', color: '#f5f2ea', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a86a' }}>404</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, margin: '1rem 0' }}>Page not found.</h1>
          <Link href="/" style={{ color: '#c9a86a', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Return home</Link>
        </div>
      </body>
    </html>
  );
}
