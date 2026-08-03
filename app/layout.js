import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEXT Securities",
    template: "%s | NEXT Securities",
  },
  description: "AI와 금융 기술로 만드는 새로운 투자 경험, NEXT Securities.",
  applicationName: "NEXT Securities",
  keywords: ["NEXT Securities", "넥스트증권", "투자", "금융", "AI"],
  authors: [{ name: "NEXT Securities" }],
  creator: "NEXT Securities",
  publisher: "NEXT Securities",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "NEXT Securities",
    title: "NEXT Securities",
    description: "AI와 금융 기술로 만드는 새로운 투자 경험.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "NEXT Securities — A new standard for financial experience.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT Securities",
    description: "AI와 금융 기술로 만드는 새로운 투자 경험.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
