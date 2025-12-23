import { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  path = '',
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/images/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'IEEE BUC Student Branch',
      images: [{ url: ogImage }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

