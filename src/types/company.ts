export type ContentSection = {
  title: string;
  content: string;
  order: number;
}

export type CompanyData = {
  name: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  cultureVideoUrl?: string;
  contentSections: ContentSection[];
}

export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  description?: string;
}
