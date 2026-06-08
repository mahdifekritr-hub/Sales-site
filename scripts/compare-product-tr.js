const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'messages', 'en.json'), 'utf8'));
const tr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'messages', 'tr.json'), 'utf8'));

const productRoots = [
  'hero', 'videoShowcase', 'solutions', 'aiMatching', 'features', 'whyUs',
  'testimonials', 'faq', 'blog', 'cta', 'ctaProducts'
];
const pageNamespaces = ['maintenancePage', 'assetsPage', 'communicationPage'];

function collectKeys(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) keys.push(...collectKeys(v, p));
    else keys.push(p);
  }
  return keys;
}

function get(obj, keyPath) {
  return keyPath.split('.').reduce((o, k) => o?.[k], obj);
}

const allKeys = new Set();
for (const r of productRoots) {
  if (en[r]) collectKeys(en[r], r).forEach(k => allKeys.add(k));
}
for (const ns of pageNamespaces) {
  if (en[ns]) collectKeys(en[ns], ns).forEach(k => allKeys.add(k));
}

const suspicious = [];
for (const key of [...allKeys].sort()) {
  const enVal = get(en, key);
  const trVal = get(tr, key);
  if (typeof enVal !== 'string') continue;
  if (trVal === undefined) suspicious.push({ key, issue: 'MISSING', en: enVal, tr: trVal });
  else if (/PropertyCare[^A]/.test(trVal) && enVal.includes('PropertyCareApp')) {
    suspicious.push({ key, issue: 'PropertyCare vs PropertyCareApp', en: enVal, tr: trVal });
  } else if (/PropFlow/i.test(trVal)) {
    suspicious.push({ key, issue: 'PropFlow brand', en: enVal, tr: trVal });
  } else if (/Demo Rezervasyonu/.test(trVal)) {
    suspicious.push({ key, issue: 'Demo Rezervasyonu', en: enVal, tr: trVal });
  } else if (/Tarafından sevilen|Modern için Akıllı|Bir Birim Tutun|Yeni Nesil PM SaaS/i.test(trVal)) {
    suspicious.push({ key, issue: 'known bad pattern', en: enVal, tr: trVal });
  }
}

console.log(JSON.stringify(suspicious, null, 2));
console.log('Total suspicious:', suspicious.length);
