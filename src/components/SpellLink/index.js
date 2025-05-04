import React from 'react';
import Link from '@docusaurus/Link';

export function SpellLink({ name, type }) {
  // Clean up spell name for URL construction
  const cleanSpellName = name
    .toLowerCase()
    .replace(/'/g, '')     // Remove apostrophes
    .replace(/\s+/g, '_')  // Replace spaces with underscores
    .replace(/[^\w-]/g, '') // Remove special characters
    + `_${type}_spell`;    // Add spell type suffix
  
  // Construct URL path
  let urlPath;
  if (type === 'wizard') {
    urlPath = `/wiki/misc/${cleanSpellName}md`;
  } else if (type === 'priest') {
    urlPath = `/wiki/misc/${cleanSpellName}md`;
  } else {
    urlPath = `/wiki/misc/${cleanSpellName}md`;
  }
  
  return (
    <Link to={urlPath} className="spell-link">
      {name}
    </Link>
  );
}
