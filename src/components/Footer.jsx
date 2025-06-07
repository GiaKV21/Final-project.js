export default function Footer() {
  return (
    <footer style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      padding: '1rem',
      backgroundColor: '#f2f2f2',
      fontSize: '0.9rem'
    }}>
      <span>Conditions of Use</span>
      <span>Privacy Notice</span>
      <span>Interest-Based Ads</span>
      <span>© 1996-2021, Amazon.com, Inc. or its affiliates</span>
    </footer>
  );
}