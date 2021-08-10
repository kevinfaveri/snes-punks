import { useRouter } from 'next/router';
import React from 'react';

const pages: React.FC = () => {
  const router = useRouter()
  const { pid } = router.query
  // use pid in swr then present the punk in this page
  return <div />;
}

export default pages;