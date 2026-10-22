import { describe, expect, it } from 'vitest';
import { caseStudies } from '@/content/work';
import { homeJsonLd, caseStudyJsonLd, jsonLdString, llmsTxt, PUBLIC_PAGES, SITE_DESCRIPTION, SITE_TITLE, workTitle } from './seo';

describe('seo', () => {
  it('title & description muat di hasil pencarian', () => {
    expect(SITE_TITLE.length).toBeLessThanOrEqual(70);
    expect(SITE_DESCRIPTION.length).toBeLessThanOrEqual(160);
  });

  it('ringkasan studi kasus ≤ 160 karakter dan slug unik', () => {
    for (const c of caseStudies) expect(c.summary.length, c.slug).toBeLessThanOrEqual(160);
    expect(new Set(caseStudies.map((c) => c.slug)).size).toBe(caseStudies.length);
  });

  it('judul halaman studi kasus (dengan suffix template) ≤ 90 karakter', () => {
    for (const c of caseStudies) expect(`${workTitle(c)} · Almadhani`.length, c.slug).toBeLessThanOrEqual(90);
  });

  it('semua studi kasus ada di daftar halaman publik', () => {
    for (const c of caseStudies) expect(PUBLIC_PAGES).toContain(`/work/${c.slug}`);
  });

  it('JSON-LD tidak bisa menutup tag script', () => {
    expect(jsonLdString({ x: '</script><b>' })).not.toContain('</script>');
  });

  it('JSON-LD beranda memuat Person dan ProfilePage', () => {
    const types = homeJsonLd()['@graph'].map((n) => n['@type']);
    expect(types).toEqual(expect.arrayContaining(['Person', 'ProfilePage', 'WebSite']));
    expect(caseStudyJsonLd(caseStudies[0])['@graph'][0]['@type']).toBe('Article');
  });

  it('llms.txt menautkan semua studi kasus', () => {
    const txt = llmsTxt();
    for (const c of caseStudies) expect(txt).toContain(`/work/${c.slug}`);
  });
});
