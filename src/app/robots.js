import config from "../../config";

export const dynamic = 'force-static'; // or 'auto' for ISR


export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap:  `${config.siteURL}/sitemap.xml`,
    }
  }