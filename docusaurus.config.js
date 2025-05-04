// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AD&D 2E Private',
  tagline: 'Advanced Dungeons & Dragons 2nd Edition Reference',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://adnd2e-private.mayorgergich.xyz',
  // Base URL for your site
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'mayorgergich',
  projectName: 'adnd2e-private',
  
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set useful
  // metadata like html lang
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links
          editUrl: 'https://github.com/mayorgergich/adnd2e-private/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Remove this to remove the "edit this page" links
          editUrl: 'https://github.com/mayorgergich/adnd2e-private/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/adnd2e-social-card.jpg',
      navbar: {
        title: 'AD&D 2E Reference',
        logo: {
          alt: 'AD&D 2E Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'characterSidebar',
            position: 'left',
            label: 'Character',
            to: '/docs/character/updated-character-sheet',
          },
          {
            type: 'docSidebar',
            sidebarId: 'campaignsSidebar',
            position: 'left',
            label: 'Campaigns',
            to: '/docs/campaigns/index',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tacticsSidebar', 
            position: 'left',
            label: 'Tactics',
            to: '/docs/tactics/tactical-guide',
          },
          {
            href: 'https://github.com/mayorgergich/adnd2e-private',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Content',
            items: [
              {
                label: 'Character',
                to: '/docs/character/updated-character-sheet',
              },
              {
                label: 'Campaigns',
                to: '/docs/campaigns/index',
              },
              {
                label: 'Monastic Combat',
                to: '/docs/tactics/monastic-combat',
              },
            ],
          },
          {
            title: 'Character Resources',
            items: [
              {
                label: 'Saint Sebaldus Connection',
                to: '/docs/character/sebaldus-connection',
              },
              {
                label: 'Setting Integration',
                to: '/docs/character/setting-integration',
              },
              {
                label: 'Combat Tactics',
                to: '/docs/tactics/tactical-guide',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/mayorgergich/adnd2e-private',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AD&D 2E Private Reference. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;