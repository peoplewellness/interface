import type { Metadata } from "next";
import "./styles/index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Powell - Decentralized Healthcare Financial Infrastructure",
  description: "Own your wellness. Control your capital. Powell is decentralized healthcare financial infrastructure for transparent, on-chain healthcare fund management on BNB Chain testnet.",
  keywords: ["Powell", "Healthcare", "Blockchain", "DeFi", "BNB Chain", "NFT", "Health Insurance", "Web3"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
