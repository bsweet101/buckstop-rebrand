const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'src', 'lib', 'products.ts');
let content = fs.readFileSync(filePath, 'utf8');

const imageMap = {
  'mate-triks-spray-doe-in-heat-2oz': '/images/products/mate-triks-spray.jpg',
  'mate-triks-pro-size-doe-in-heat-4oz': '/images/products/mate-triks-pro.jpg',
  '200-proof-ultimate-doe-in-heat-2oz': '/images/products/200-proof.png',
  'x-cel-fresh-estrus-buck-lure-1-25oz': '/images/products/x-cel.jpg',
  'the-peak-premium-doe-in-heat-2oz': '/images/products/the-peak.jpg',
  'guide-grade-scents-doe-in-heat-2oz': '/images/products/guide-grade.jpg',
  'ruckn-buck-dominant-buck-urine-2oz': '/images/products/ruckn-buck.jpg',
  'supreme-buck-urine-1-25oz': '/images/products/supreme-buck.jpg',
  'five-2oz': '/images/products/five.jpg',
  'alure-1-25oz': '/images/products/alure.jpg',
  'buc-plus-1-25oz': '/images/products/buc-plus.jpg',
  'bag-a-buck-kit': '/images/products/bag-a-buck.jpg',
  'gland-u-lure-1-25oz': '/images/products/gland-u-lure.jpg',
  'gland-u-lure-spray-2oz': '/images/products/gland-u-lure-spray.jpg',
  'gland-u-lure-tr-2oz': '/images/products/gland-u-lure-tr.jpg',
  'gland-u-lure-pro-size-4oz': '/images/products/gland-u-lure-pro.jpg',
  'mate-triks-buck-beads-5-75oz': '/images/products/buck-beads-mate-triks.jpg',
  'sweet-corn-buck-beads-5-75oz': '/images/products/buck-beads-sweet-corn.jpg',
  'gland-u-lure-buck-beads-5-75oz': '/images/products/buck-beads-gland-u-lure.jpg',
  'sugar-beet-buck-beads-5-75oz': '/images/products/buck-beads-sugar-beet.jpg',
};

let updated = 0;
for (const [slug, imgPath] of Object.entries(imageMap)) {
  // Find the product block by slug and replace image: '' with the actual path
  const slugEscaped = slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(
    `(slug: '${slugEscaped}'[\\s\\S]*?image: )'()'`,
  );
  if (regex.test(content)) {
    content = content.replace(regex, `$1'${imgPath}'`);
    updated++;
    console.log(`Updated: ${slug}`);
  } else {
    console.log(`Skipped (not found or already set): ${slug}`);
  }
}

fs.writeFileSync(filePath, content);
console.log(`\nDone. Updated ${updated} products.`);
