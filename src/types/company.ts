export type ContentSection = {
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
}

export type BenefitCard = {
  title: string;
  description: string;
}

export type CompanyData = {
  name: string;
  slug?: string;
  tagline?: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  cultureVideoUrl?: string;
  contentSections: ContentSection[];
  benefitCards: BenefitCard[];
}

export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  description?: string;
}
