import "./globals.css";
import { RouteGuard } from "@/components/RouteGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RouteGuard>{children}</RouteGuard>
      </body>
    </html>
  );
}
