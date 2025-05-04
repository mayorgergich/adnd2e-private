import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/character/updated-character-sheet">
            View Character Sheet
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A private reference for AD&D 2nd Edition resources, character sheets, and campaign materials">
      <HomepageHeader />
      <main>
        <div className="container margin-top--lg margin-bottom--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h2 className="text--center margin-bottom--lg">Your Personal AD&D 2E Reference</h2>
              <p className="text--center">
                This private site contains resources, character information, and campaign references for your Advanced Dungeons & Dragons 2nd Edition games.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container margin-bottom--xl">
          <div className="row">
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-card__header">
                  <div className="feature-card__icon">📝</div>
                  <h3 className="feature-card__title">Character</h3>
                </div>
                <p>Character sheet and background for Augustus "X" Groß, including abilities, equipment, and monastic training.</p>
                <div className="text--right">
                  <Link className="button button--secondary button--sm" to="/docs/character/updated-character-sheet">
                    View Character
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-card__header">
                  <div className="feature-card__icon">⚔️</div>
                  <h3 className="feature-card__title">Combat & Tactics</h3>
                </div>
                <p>Detailed combat tactics, eastern monastic techniques, and integration with clerical abilities.</p>
                <div className="text--right">
                  <Link className="button button--secondary button--sm" to="/docs/tactics/monastic-combat">
                    View Tactics
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-card__header">
                  <div className="feature-card__icon">🗺️</div>
                  <h3 className="feature-card__title">Campaign References</h3>
                </div>
                <p>Campaign settings, world-specific spell lists, and adventure references for your ongoing campaigns.</p>
                <div className="text--right">
                  <Link className="button button--secondary button--sm" to="/docs/campaigns/mystara-setting-wsc">
                    View Campaigns
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container margin-bottom--xl">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <div className="card">
                <div className="card__header">
                  <h3>Recent Updates</h3>
                </div>
                <div className="card__body">
                  <ul>
                    <li><strong>Character Development:</strong> Added detailed background for Augustus "X" Groß</li>
                    <li><strong>Combat Techniques:</strong> Expanded eastern monastic combat integration guide</li>
                    <li><strong>Setting Integration:</strong> New material on Nuremberg political and religious landscape</li>
                    <li><strong>Mystara Spells:</strong> Added WSC spell references for the Mystara campaign setting</li>
                  </ul>
                </div>
                <div className="card__footer">
                  <p>Last updated: May 3, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}