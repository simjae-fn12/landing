import "./globals.css";

export const metadata = {
  title: "NEXT 증권 — Design Concepts",
  description: "NEXT 증권을 위한 네 가지 레퍼런스 기반 디지털 콘셉트."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
