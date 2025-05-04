import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomePageFeatures';

export default function Home() {
  return (
    <Layout
      title="Home"
      description="AD&D 2E Private Reference">
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}