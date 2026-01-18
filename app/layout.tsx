import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import theme from "@/theme";
import "remixicon/fonts/remixicon.css";
import { ds } from "@/design-system";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Allkons M Design",
  description: "B2B Pre-Construction Materials Marketplace",
  icons: {
    icon: "/assets/logos/Logo mark/Theme=Default, Size=sm, Type=Icon.svg",
    shortcut: "/assets/logos/Logo mark/Theme=Default, Size=sm, Type=Icon.svg",
    apple: "/assets/logos/Logo mark/Theme=Default, Size=sm, Type=Icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: ds.color.background('primary') }}>
      <body className={inter.className} style={{ backgroundColor: ds.color.background('primary') }}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
