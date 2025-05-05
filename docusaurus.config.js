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

  // Add the plugin configuration here
  plugins: [
    [
      'docusaurus-plugin-remote-content',
      {
        // Specify the content you want to pull from adnd2e.fandom.com
        name: 'adnd2e-wiki',
        // Automatically create required folders
        createFolders: true,
        // Default output directory for CLI commands
        defaultOutDir: 'docs/reference',
        // Required output directory
        outDir: 'docs/reference',
        // Required documents parameter (empty as we're using sources)
        documents: [],
        // Required source base URL
        sourceBaseUrl: 'https://adnd2e.fandom.com/wiki/',
        // You can have multiple sources
        sources: [
          {
            name: 'classes',
            url: 'https://adnd2e.fandom.com/wiki/Classes',
            outDir: 'docs/reference/classes',
            fileName: 'index.md',
            frontMatter: {
              title: 'AD&D 2E Classes',
              sidebar_label: 'Classes',
              description: 'Reference information for AD&D 2E classes pulled from adnd2e.fandom.com',
            },
            modifyContent: (content) => {
              // Advanced content processing for better wiki content extraction
              let cleanedContent = content;
              
              // Remove headers, navigation, and sidebars
              const contentStart = content.indexOf('<div class="page-content">');
              if (contentStart > -1) {
                cleanedContent = content.substring(contentStart);
              }
              
              // Try to find the main content area
              const mainContentStart = cleanedContent.indexOf('<main');
              const mainContentEnd = cleanedContent.indexOf('</main>', mainContentStart);
              
              if (mainContentStart > -1 && mainContentEnd > -1) {
                cleanedContent = cleanedContent.substring(mainContentStart, mainContentEnd + 7);
              }
              
              // Extract tables - keep table structure if possible
              cleanedContent = cleanedContent.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match) => {
                // Try to preserve tables by converting them to markdown tables
                const tableContent = match
                  .replace(/<thead>|<tbody>|<\/thead>|<\/tbody>/gi, '')
                  .replace(/<tr[^>]*>/gi, '\n| ')
                  .replace(/<\/tr>/gi, ' |')
                  .replace(/<th[^>]*>|<td[^>]*>/gi, ' ')
                  .replace(/<\/th>|<\/td>/gi, ' |');
                
                return '\n\n' + tableContent + '\n\n';
              });
              
              // Remove script and style tags
              cleanedContent = cleanedContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
              cleanedContent = cleanedContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
              
              // Convert links to markdown format (preserve links to other wiki pages)
              cleanedContent = cleanedContent.replace(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/gi, (match, url, text) => {
                // For external URLs, use markdown link format
                if (url.startsWith('http')) {
                  return `[${text}](${url})`;
                }
                // For wiki internal links, convert to appropriate format
                else if (url.startsWith('/wiki/')) {
                  const pageName = url.replace('/wiki/', '');
                  return `[${text}](/docs/reference/${pageName.toLowerCase()})`;
                }
                // Default fallback
                return text;
              });
              
              // Remove most HTML tags but preserve headings and lists
              cleanedContent = cleanedContent
                .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
                .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
                .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
                .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
                .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
                .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
                .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, list) => {
                  return list.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '* $1\n');
                })
                .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, list) => {
                  let counter = 1;
                  return list.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => {
                    return `${counter++}. $1\n`;
                  });
                })
                .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]*>/g, ''); // Remove any remaining tags
              
              // Clean up extra spaces and line breaks
              cleanedContent = cleanedContent
                .replace(/\n\s*\n\s*\n/g, '\n\n')
                .replace(/&nbsp;/g, ' ')
                .trim();
              
              return '---\n' +
                'title: AD&D 2E Classes\n' +
                'sidebar_label: Classes\n' +
                'description: Reference information for AD&D 2E classes pulled from adnd2e.fandom.com\n' +
                '---\n\n' +
                '# AD&D 2E Classes\n\n' +
                'This content is sourced from [adnd2e.fandom.com/wiki/Classes](https://adnd2e.fandom.com/wiki/Classes)\n\n' +
                cleanedContent;
            },
          },
          {
            name: 'races',
            url: 'https://adnd2e.fandom.com/wiki/Races',
            outDir: 'docs/reference/races',
            fileName: 'index.md',
            frontMatter: {
              title: 'AD&D 2E Races',
              sidebar_label: 'Races',
              description: 'Reference information for AD&D 2E races pulled from adnd2e.fandom.com',
            },
            modifyContent: (content) => {
              // Use the same advanced content processing as for classes
              let cleanedContent = content;
              
              // Remove headers, navigation, and sidebars
              const contentStart = content.indexOf('<div class="page-content">');
              if (contentStart > -1) {
                cleanedContent = content.substring(contentStart);
              }
              
              // Try to find the main content area
              const mainContentStart = cleanedContent.indexOf('<main');
              const mainContentEnd = cleanedContent.indexOf('</main>', mainContentStart);
              
              if (mainContentStart > -1 && mainContentEnd > -1) {
                cleanedContent = cleanedContent.substring(mainContentStart, mainContentEnd + 7);
              }
              
              // Extract tables - keep table structure if possible
              cleanedContent = cleanedContent.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match) => {
                // Try to preserve tables by converting them to markdown tables
                const tableContent = match
                  .replace(/<thead>|<tbody>|<\/thead>|<\/tbody>/gi, '')
                  .replace(/<tr[^>]*>/gi, '\n| ')
                  .replace(/<\/tr>/gi, ' |')
                  .replace(/<th[^>]*>|<td[^>]*>/gi, ' ')
                  .replace(/<\/th>|<\/td>/gi, ' |');
                
                return '\n\n' + tableContent + '\n\n';
              });
              
              // Remove script and style tags
              cleanedContent = cleanedContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
              cleanedContent = cleanedContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
              
              // Convert links to markdown format (preserve links to other wiki pages)
              cleanedContent = cleanedContent.replace(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/gi, (match, url, text) => {
                // For external URLs, use markdown link format
                if (url.startsWith('http')) {
                  return `[${text}](${url})`;
                }
                // For wiki internal links, convert to appropriate format
                else if (url.startsWith('/wiki/')) {
                  const pageName = url.replace('/wiki/', '');
                  return `[${text}](/docs/reference/${pageName.toLowerCase()})`;
                }
                // Default fallback
                return text;
              });
              
              // Remove most HTML tags but preserve headings and lists
              cleanedContent = cleanedContent
                .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
                .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
                .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
                .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
                .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
                .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
                .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, list) => {
                  return list.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '* $1\n');
                })
                .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, list) => {
                  let counter = 1;
                  return list.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => {
                    return `${counter++}. $1\n`;
                  });
                })
                .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]*>/g, ''); // Remove any remaining tags
              
              // Clean up extra spaces and line breaks
              cleanedContent = cleanedContent
                .replace(/\n\s*\n\s*\n/g, '\n\n')
                .replace(/&nbsp;/g, ' ')
                .trim();
              
              return '---\n' +
                'title: AD&D 2E Races\n' +
                'sidebar_label: Races\n' +
                'description: Reference information for AD&D 2E races pulled from adnd2e.fandom.com\n' +
                '---\n\n' +
                '# AD&D 2E Races\n\n' +
                'This content is sourced from [adnd2e.fandom.com/wiki/Races](https://adnd2e.fandom.com/wiki/Races)\n\n' +
                cleanedContent;
            },
          },
          // Additional sources
          {
            name: 'spells',
            url: 'https://adnd2e.fandom.com/wiki/All_Wizard_Spells',
            outDir: 'docs/reference/spells/wizard',
            fileName: 'index.md',
            frontMatter: {
              title: 'AD&D 2E Wizard Spells',
              sidebar_label: 'Wizard Spells',
              description: 'Reference information for AD&D 2E wizard spells pulled from adnd2e.fandom.com',
            },
            // Using the same content processing function as above
            modifyContent: (content) => {
              // Same cleaning process as above
              let cleanedContent = content;
              
              // Processing code similar to above...
              // Remove headers, navigation, and sidebars
              const contentStart = content.indexOf('<div class="page-content">');
              if (contentStart > -1) {
                cleanedContent = content.substring(contentStart);
              }
              
              // Extract main content and clean it up using the same process as above
              const mainContentStart = cleanedContent.indexOf('<main');
              const mainContentEnd = cleanedContent.indexOf('</main>', mainContentStart);
              
              if (mainContentStart > -1 && mainContentEnd > -1) {
                cleanedContent = cleanedContent.substring(mainContentStart, mainContentEnd + 7);
              }
              
              // Apply the same cleaning steps as before...
              // Remove HTML tags, preserve structure, etc.
              // Clean up links, tables, and other elements
              
              cleanedContent = cleanedContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
              cleanedContent = cleanedContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
              
              // Clean up most HTML tags but keep structure
              cleanedContent = cleanedContent
                .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
                .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
                .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
                .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
                .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]*>/g, ''); // Remove any remaining tags
              
              return '---\n' +
                'title: AD&D 2E Wizard Spells\n' +
                'sidebar_label: Wizard Spells\n' +
                'description: Reference information for AD&D 2E wizard spells pulled from adnd2e.fandom.com\n' +
                '---\n\n' +
                '# AD&D 2E Wizard Spells\n\n' +
                'This content is sourced from [adnd2e.fandom.com/wiki/All_Wizard_Spells](https://adnd2e.fandom.com/wiki/All_Wizard_Spells)\n\n' +
                cleanedContent;
            },
          },
          {
            name: 'priest-spells',
            url: 'https://adnd2e.fandom.com/wiki/All_Priest_Spells',
            outDir: 'docs/reference/spells/priest',
            fileName: 'index.md',
            frontMatter: {
              title: 'AD&D 2E Priest Spells',
              sidebar_label: 'Priest Spells',
              description: 'Reference information for AD&D 2E priest spells pulled from adnd2e.fandom.com',
            },
            // Using the same content processing function
            modifyContent: (content) => {
              // Same cleaning process
              let cleanedContent = content;
              
              // Apply the same cleaning steps as for the wizard spells
              const contentStart = content.indexOf('<div class="page-content">');
              if (contentStart > -1) {
                cleanedContent = content.substring(contentStart);
              }
              
              const mainContentStart = cleanedContent.indexOf('<main');
              const mainContentEnd = cleanedContent.indexOf('</main>', mainContentStart);
              
              if (mainContentStart > -1 && mainContentEnd > -1) {
                cleanedContent = cleanedContent.substring(mainContentStart, mainContentEnd + 7);
              }
              
              cleanedContent = cleanedContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
              cleanedContent = cleanedContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
              
              cleanedContent = cleanedContent
                .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
                .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
                .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
                .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
                .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]*>/g, ''); // Remove any remaining tags
              
              return '---\n' +
                'title: AD&D 2E Priest Spells\n' +
                'sidebar_label: Priest Spells\n' +
                'description: Reference information for AD&D 2E priest spells pulled from adnd2e.fandom.com\n' +
                '---\n\n' +
                '# AD&D 2E Priest Spells\n\n' +
                'This content is sourced from [adnd2e.fandom.com/wiki/All_Priest_Spells](https://adnd2e.fandom.com/wiki/All_Priest_Spells)\n\n' +
                cleanedContent;
            },
          },
          {
            name: 'nonweapon-proficiencies',
            url: 'https://adnd2e.fandom.com/wiki/Nonweapon_Proficiencies',
            outDir: 'docs/reference/proficiencies',
            fileName: 'index.md',
            frontMatter: {
              title: 'AD&D 2E Nonweapon Proficiencies',
              sidebar_label: 'Nonweapon Proficiencies',
              description: 'Reference information for AD&D 2E nonweapon proficiencies pulled from adnd2e.fandom.com',
            },
            // Using the same content processing function
            modifyContent: (content) => {
              // Same cleaning process as for other content
              let cleanedContent = content;
              
              // Apply the cleaning process
              const contentStart = content.indexOf('<div class="page-content">');
              if (contentStart > -1) {
                cleanedContent = content.substring(contentStart);
              }
              
              const mainContentStart = cleanedContent.indexOf('<main');
              const mainContentEnd = cleanedContent.indexOf('</main>', mainContentStart);
              
              if (mainContentStart > -1 && mainContentEnd > -1) {
                cleanedContent = cleanedContent.substring(mainContentStart, mainContentEnd + 7);
              }
              
              cleanedContent = cleanedContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
              cleanedContent = cleanedContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
              
              cleanedContent = cleanedContent
                .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
                .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
                .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
                .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
                .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]*>/g, ''); // Remove any remaining tags
              
              return '---\n' +
                'title: AD&D 2E Nonweapon Proficiencies\n' +
                'sidebar_label: Nonweapon Proficiencies\n' +
                'description: Reference information for AD&D 2E nonweapon proficiencies pulled from adnd2e.fandom.com\n' +
                '---\n\n' +
                '# AD&D 2E Nonweapon Proficiencies\n\n' +
                'This content is sourced from [adnd2e.fandom.com/wiki/Nonweapon_Proficiencies](https://adnd2e.fandom.com/wiki/Nonweapon_Proficiencies)\n\n' +
                cleanedContent;
            },
          },
        ],
      },
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
            to: '/docs/campaigns',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tacticsSidebar', 
            position: 'left',
            label: 'Tactics',
            to: '/docs/tactics/tactical-guide',
          },
          // Add a new item for the reference section
          {
            type: 'docSidebar',
            sidebarId: 'referenceSidebar',
            position: 'left',
            label: 'Reference',
            to: '/docs/reference',
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
                to: '/docs/campaigns',
              },
              {
                label: 'Monastic Combat',
                to: '/docs/tactics/monastic-combat',
              },
              {
                label: 'Reference',
                to: '/docs/reference',
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