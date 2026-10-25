import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tamirpakdasht.ir',
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/sitemap-check'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const decodedUrl = decodeURIComponent(item.url);
        if (decodedUrl === 'https://tamirpakdasht.ir/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (
          decodedUrl.includes('/تعمیر-لوازم-خانگی') ||
          decodedUrl.includes('/امداد-خودرو') ||
          decodedUrl.includes('/تعمیر-یخچال') ||
          decodedUrl.includes('/تعمیر-لباسشویی') ||
          decodedUrl.includes('/تعمیر-کولر-گازی') ||
          decodedUrl.includes('/تعمیر-پکیج') ||
          decodedUrl.includes('/تعمیر-اجاق-گاز') ||
          decodedUrl.includes('/یدک-کش') ||
          decodedUrl.includes('/مکانیک-سیار') ||
          decodedUrl.includes('/خودروبر')
        ) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        if (
          decodedUrl.includes('پاکدشت') ||
          decodedUrl.includes('قرچک') ||
          decodedUrl.includes('ورامین') ||
          decodedUrl.includes('پیشوا') ||
          decodedUrl.includes('تهران')
        ) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }
        if (decodedUrl.includes('/وبلاگ/')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }
        return item;
      },
    }),
  ],
});
