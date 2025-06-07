'use client';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white'
    }}>
      <img src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'contain', marginBottom: '12px' }} />
      <p style={{ fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>{product.title}</p>
      <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '8px' }}>${product.price.toFixed(2)}</p>
      <Link href={`/products/details/${product.id}`} style={{
        backgroundColor: '#007b8f',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '4px',
        textDecoration: 'none',
        marginTop: 'auto'
      }}>
        View Details
      </Link>
    </div>
  );
}