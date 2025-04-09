import Config from '../config';

export default function sitemap() {
  const { SITE_URL } = Config;
  const currentDate = new Date();
  const paths = ['/','/reels','/photo','/video', '/posts/about', '/posts/contact', '/posts/privacy-policy', '/posts/terms-and-condition'];

  return paths.map(path => ({
    url: `${SITE_URL}${path}`,
    lastModified: currentDate,
    changeFrequency: path === '' ? 'yearly' : 'weekly', // Adjusted change frequency for homepage and other pages
    priority: path === '' ? 1 : 0.5,
  }));
}