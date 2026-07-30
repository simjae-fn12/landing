import "./globals.css";

export const metadata = {
  title: "NEXT Securities",
  description: "AI가 만드는 새로운 투자 경험.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
