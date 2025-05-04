import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Character Development',
    Svg: require('@site/static/img/character-icon.svg').default,
    description: (
      <>
        Track character development, abilities, and background information for 
        Augustus "X" Groß with eastern monastic training.
      </>
    ),
  },
  {
    title: 'Combat Techniques',
    Svg: require('@site/static/img/combat-icon.svg').default,
    description: (
      <>
        Access detailed combat tactics that blend clerical magic with eastern
        monastic techniques for a unique fighting style.
      </>
    ),
  },
  {
    title: 'Campaign Resources',
    Svg: require('@site/static/img/campaign-icon.svg').default,
    description: (
      <>
        Keep track of campaign-specific information, world settings, and 
        spell references for your ongoing adventures.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}