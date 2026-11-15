export interface ISEO {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  siteName?: string;
  locale?: string;
}

export interface ILayout {
  meta: ISEO;
  lang?: string;
}

export interface IFeature {
  icon: string;
  title: string;
  text: string;
}

export interface IGetSEOUrls {
  /** Домен из `site` в astro.config, если не задан, берётся адрес запроса */
  base: URL;
  pathname: string;
  canonical?: string;
  image?: string;
}
