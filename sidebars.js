/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  
  // Character sidebar
  characterSidebar: [
    {
      type: 'category',
      label: 'Character',
      collapsible: false,
      items: [
        'character/updated-character-sheet',
        'character/sebaldus-connection',
        'character/setting-integration'
      ],
    },
  ],

  // Campaigns sidebar
  campaignsSidebar: [
    {
      type: 'category',
      label: 'Campaigns',
      collapsible: false,
      items: [
        'campaigns/mystara-setting-wsc',
      ],
    },
  ],

  // Tactics sidebar
  tacticsSidebar: [
    {
      type: 'category',
      label: 'Tactics & Combat',
      collapsible: false,
      items: [
        'tactics/monastic-combat',
        'tactics/tactical-guide',
      ],
    },
  ],
};

module.exports = sidebars;