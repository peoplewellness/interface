# Powell - People Wellness

Decentralized healthcare financial infrastructure. Own your wellness, control your capital.

## Overview

Powell is a Web3 healthcare platform that enables transparent, efficient, and decentralized healthcare financing through blockchain technology. Built on BNB Chain, Powell provides reimbursement-based health insurance with NFT policy management and on-chain treasury settlement.

## Features

- **NFT-Based Policy Management**: Health insurance policies as NFTs for transparent ownership
- **On-Chain Treasury**: Transparent fund management and settlement on BNB Chain
- **Web3 Wallet Integration**: Connect with MetaMask and other Web3 wallets
- **Decentralized Governance**: Community-driven protocol parameters (coming soon)
- **Reimbursement System**: Claims managed by licensed TPAs with on-chain settlement

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Web3**: Wagmi 3.3, Viem 2.44
- **UI Components**: Radix UI, Lucide React
- **Animation**: Motion (Framer Motion)
- **Build Tool**: Turbopack (default in Next.js 16)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/peoplewellness/interface.git
cd powell
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration.

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
powell/
├── app/                    # Next.js app directory
│   ├── app/               # Dashboard application
│   ├── monkz/             # Monkz meme token page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Footer
│   └── ...               # Landing page sections
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

## Roadmap

### Phase 1: Reimbursement Coordination Pilot ✅
- NFT-based policy issuance
- On-chain treasury and settlement
- Claims managed by licensed TPAs

### Phase 2: Governance Activation 🚧
- Decentralized governance (DAO)
- Community participation in protocol parameters
- Treasury transparency and reporting

### Phase 3: Ecosystem Integration
- Healthcare provider integration
- Improved claims workflows
- Healthcare system interoperability

### Phase 4: Cashless Settlement
- Real-time coverage verification
- On-chain settlement with off-chain validation

### Phase 5: Community Support
- Medical fundraising
- Decentralized assistance pools
- Healthcare infrastructure financing

### Phase 6: Global Expansion
- Multi-region expansion
- Local regulatory adaptation
- Access for underserved populations

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting PRs.

## Documentation

- [Whitepaper](https://github.com/peoplewellness/whitepaper/blob/main/whitepaper.md)

## Support

- Email: harisaginting@gmail.com
- Twitter: [@Powell](https://twitter.com/powell)
- Discord: [Join our community](https://discord.gg/powell)

## License

This project is licensed under the MIT License.
