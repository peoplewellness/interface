"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp,
  Shield,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  Coins,
  FileText,
  ArrowUpRight,
  Zap
} from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";

// Type definitions
interface SubBenefit {
  name: string;
  limit: string;
}

interface Benefit {
  category: string;
  annualLimit: string;
  subBenefits: SubBenefit[];
}

interface ClaimHistory {
  claimNumber: string;
  date: string;
  approvedAmount: string;
  status: string;
}

interface Policy {
  id: string;
  cardNumber: string;
  tpaProvider: string;
  tpaPortalUrl: string;
  type: string;
  commitment: string;
  netContribution: string;
  totalCoverageLimit: string;
  benefits: Benefit[];
  duration: string;
  startDate: string;
  endDate: string;
  status: string;
  utilization: string;
  claimHistory: ClaimHistory[];
}

// Mock data based on whitepaper stress test scenario (Normal Year)
// Whitepaper formulas:
// Dᵢ = User deposit, F = Admin fee (5%), Nᵢ = Dᵢ × (1 − F)
// T = Σ Nᵢ (total net contributions)
// TC = Σ Cᵢ (total claims)
// PS = T - TC (protocol surplus)
// RP = PS × Rₚ (rebate pool, where Rₚ is rebate pool ratio)

// Calculations:
// Total deposits: 10,000 × 1,000 = 10,000,000 USDT
// Admin fees (5%): 500,000 USDT
// T (net contributions): 9,500,000 USDT
// TC (claims at 35%): 3,500,000 USDT
// PS (protocol surplus): 6,000,000 USDT
// RP (rebate pool at 10%): 600,000 USDT
// Treasury: Admin fees (500k) + remaining surplus (5,400k) = 5,900,000 USDT

const protocolMetrics = {
  tvl: {
    totalDeposits: "10,000,000", // Total participant deposits (Σ Dᵢ)
    netContributions: "9,500,000", // T = After admin fee
    breakdown: {
      adminFees: "500,000", // F × Σ Dᵢ (goes to treasury)
      activeBalance: "6,000,000", // T - TC (available for claims + rebates)
      totalClaimed: "3,500,000" // TC (paid claims)
    }
  },
  treasury: {
    value: "5,900,000", // Admin fees + surplus after rebate pool
    breakdown: {
      adminFees: "500,000", // Revenue from coordination fees
      protocolSurplus: "5,400,000" // PS - RP (surplus after rebate pool allocation)
    },
    change: "+12.5%",
    trend: "up"
  },
  rebatePool: {
    value: "600,000", // RP = PS × Rₚ (10% of 6M surplus)
    poolRatio: "10%", // Rₚ
    totalSurplus: "6,000,000", // PS = T - TC
    distributed: "0" // Will be distributed at plan maturity
  },
  hpToken: {
    price: "0.065",
    marketCap: "6,500,000",
    change24h: "+5.8%",
    trend: "up",
    circulatingSupply: "100,000,000",
    totalStaked: "45,000,000",
    stakingAPR: "12.5"
  },
  claimRatio: {
    value: "35%", // TC / T
    totalClaimed: "3,500,000",
    totalApproved: "1,842"
  },
  activePolicies: {
    total: "10,000",
    basic: "5,200",
    premium: "3,800",
    elite: "1,000"
  },
  participants: {
    total: "10,000",
    newThisMonth: "+420"
  }
};

// Mock user data - replace with actual wallet data
// User has 2 policies: Premium (5000 USDT) + Basic (1000 USDT) = 6000 total deposit
// After 5% admin fee: 5700 USDT net contribution (Nᵢ)
// User claimed 1020 USDT → Utilization ratio: 1020/5700 = 17.89% ≈ 18%
// APR calculation: Lower utilization = higher rebate weight = higher HP staking APR
// Base APR 12.5% + bonus for low utilization (18% vs 35% avg) = ~15.8% APR
const userMetrics = {
  activePolicies: [
    {
      id: "NFT-0001",
      cardNumber: "POWELL-2025-001234",
      tpaProvider: "HealthCare TPA Services Inc.",
      tpaPortalUrl: "https://healthcare-tpa.example.com/submit-claim",
      type: "Premium Protection",
      commitment: "5,000 USDT",
      netContribution: "4,750 USDT", // After 5% admin fee
      totalCoverageLimit: "25,000 USDT",
      benefits: [
        {
          category: "Inpatient",
          annualLimit: "15,000 USDT",
          subBenefits: [
            { name: "Room & Board", limit: "500 USDT/day" },
            { name: "ICU", limit: "1,000 USDT/day" },
            { name: "Surgery", limit: "10,000 USDT" }
          ]
        },
        {
          category: "Outpatient",
          annualLimit: "5,000 USDT",
          subBenefits: [
            { name: "GP Consultation", limit: "100 USDT/visit" },
            { name: "Specialist", limit: "200 USDT/visit" },
            { name: "Diagnostics", limit: "1,000 USDT" }
          ]
        },
        {
          category: "Dental",
          annualLimit: "3,000 USDT",
          subBenefits: [
            { name: "Preventive", limit: "500 USDT" },
            { name: "Basic", limit: "1,500 USDT" },
            { name: "Major", limit: "3,000 USDT" }
          ]
        },
        {
          category: "Maternity",
          annualLimit: "2,000 USDT",
          subBenefits: [
            { name: "Prenatal Care", limit: "500 USDT" },
            { name: "Delivery", limit: "1,500 USDT" }
          ]
        }
      ],
      duration: "12 months",
      startDate: "2025-01-01",
      endDate: "2026-01-01",
      status: "active",
      daysRemaining: 354,
      utilization: "16%", // 760 / 4750
      currentAPR: "16.2%", // Higher APR due to lower utilization
      claimHistory: [
        {
          claimNumber: "CLM-2025-001234-001",
          date: "2025-11-15",
          approvedAmount: "450 USDT",
          status: "paid"
        },
        {
          claimNumber: "CLM-2025-001234-002",
          date: "2025-09-22",
          approvedAmount: "310 USDT",
          status: "paid"
        }
      ]
    },
    {
      id: "NFT-0042",
      cardNumber: "POWELL-2025-004567",
      tpaProvider: "MediCare Claims Management",
      tpaPortalUrl: "https://medicare-claims.example.com/new-claim",
      type: "Basic Protection",
      commitment: "1,000 USDT",
      netContribution: "950 USDT", // After 5% admin fee
      totalCoverageLimit: "5,000 USDT",
      benefits: [
        {
          category: "Inpatient",
          annualLimit: "3,000 USDT",
          subBenefits: [
            { name: "Room & Board", limit: "300 USDT/day" },
            { name: "Surgery", limit: "2,500 USDT" }
          ]
        },
        {
          category: "Outpatient",
          annualLimit: "1,500 USDT",
          subBenefits: [
            { name: "GP Consultation", limit: "50 USDT/visit" },
            { name: "Specialist", limit: "100 USDT/visit" }
          ]
        },
        {
          category: "Dental",
          annualLimit: "500 USDT",
          subBenefits: [
            { name: "Preventive", limit: "200 USDT" },
            { name: "Basic", limit: "500 USDT" }
          ]
        }
      ],
      duration: "12 months",
      startDate: "2025-12-15",
      endDate: "2026-12-15",
      status: "active",
      daysRemaining: 369,
      utilization: "27%", // 260 / 950
      currentAPR: "13.5%", // Moderate APR
      claimHistory: [
        {
          claimNumber: "CLM-2025-004567-001",
          date: "2025-12-28",
          approvedAmount: "260 USDT",
          status: "paid"
        }
      ]
    }
  ],
  stakedBalance: {
    hp: "50,000", // HP tokens staked
    usdValue: "3,250" // 50,000 × $0.065
  },
  personalClaimRatio: {
    value: "18%", // 1020 / 5700 total net contribution
    totalClaimed: "1,020", // Sum of all approved claims
    totalAvailable: "5,700", // Total net contributions after fees
    totalApproved: 3 // Number of approved claims (offchain processed, onchain settled)
  },
  forecastRebate: {
    estimated: "4,756", // Uᵢ + RBᵢ (unused + rebate allocation)
    breakdown: {
      unusedBalance: "4,680", // Uᵢ = Nᵢ - Cᵢ (always returned)
      rebateAllocation: "76" // RBᵢ = RP × (Wᵢ / ΣW) from surplus pool
    },
    confidence: "high"
  }
};

export default function AppPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering wallet-dependent UI on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section with Wallet Connection */}
        <section className="relative py-12 bg-gradient-to-b from-background to-surface/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="text-text-primary">People Own </span>
                  <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    Health Coverage
                  </span>
                </h1>
                <p className="text-text-secondary text-lg">
                  Health Together, Wellness Together
                </p>
              </div>

              {/* Wallet Connection */}
              {!mounted ? (
                <div className="w-[180px] h-[44px]" />
              ) : !isConnected ? (
                <Button
                  size="lg"
                  onClick={handleConnect}
                  disabled={isPending || connectors.length === 0}
                  className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-background font-semibold shadow-lg"
                >
                  <Wallet className="mr-2" size={20} />
                  {isPending ? "Connecting..." : "Connect Wallet"}
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent-teal/20 border border-primary/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm font-semibold text-primary">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnect()}
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <section className="py-8 bg-surface/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Protocol Section Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-2">Protocol Overview</h2>
              <p className="text-text-muted">Real-time protocol metrics and treasury status</p>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* TVL Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="h-full"
              >
                <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-text-muted">
                      Total Value Locked (TVL)
                    </CardTitle>
                    <DollarSign className="w-5 h-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-text-primary mb-3">
                      ${protocolMetrics.tvl.totalDeposits}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Net Contributions (T):</span>
                        <span className="text-text-primary font-medium">${protocolMetrics.tvl.netContributions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Claims Paid (TC):</span>
                        <span className="text-text-primary font-medium">${protocolMetrics.tvl.breakdown.totalClaimed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Available Balance:</span>
                        <span className="text-green-500 font-medium">${protocolMetrics.tvl.breakdown.activeBalance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Treasury Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="h-full"
              >
                <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-text-muted">
                      Treasury Balance
                    </CardTitle>
                    <Shield className="w-5 h-5 text-accent-teal" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-text-primary mb-3">
                      ${protocolMetrics.treasury.value}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Admin Fees:</span>
                        <span className="text-text-primary font-medium">${protocolMetrics.treasury.breakdown.adminFees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Protocol Surplus:</span>
                        <span className="text-accent font-medium">${protocolMetrics.treasury.breakdown.protocolSurplus}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rebate Pool Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="h-full"
              >
                <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-text-muted">
                      Rebate Pool (RP)
                    </CardTitle>
                    <Coins className="w-5 h-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-text-primary mb-3">
                      ${protocolMetrics.rebatePool.value}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Pool Ratio (Rₚ):</span>
                        <span className="text-green-500 font-medium">{protocolMetrics.rebatePool.poolRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Total Surplus (PS):</span>
                        <span className="text-text-primary font-medium">${protocolMetrics.rebatePool.totalSurplus}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Participants Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="h-full"
              >
                <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-text-muted">
                      Total Participants
                    </CardTitle>
                    <Users className="w-5 h-5 text-accent-teal" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-text-primary mb-1">
                      {protocolMetrics.participants.total}
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500">{protocolMetrics.participants.newThisMonth}</span>
                      <span className="text-text-muted ml-1">this month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Second Row - HP Token & Claims */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* HP Token Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-primary" />
                      $HP Token Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Current Price</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-text-primary">
                            ${protocolMetrics.hpToken.price}
                          </span>
                          <div className="flex items-center text-sm">
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">{protocolMetrics.hpToken.change24h}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <div className="text-sm text-text-muted mb-1">Market Cap</div>
                          <div className="text-lg font-semibold text-text-primary">
                            ${protocolMetrics.hpToken.marketCap}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-text-muted mb-1">Circulating Supply</div>
                          <div className="text-lg font-semibold text-text-primary">
                            {protocolMetrics.hpToken.circulatingSupply}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <div className="text-sm text-text-muted mb-1">Total Staked</div>
                          <div className="text-lg font-semibold text-accent">
                            {protocolMetrics.hpToken.totalStaked} HP
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-text-muted mb-1">Staking APR</div>
                          <div className="text-lg font-semibold text-green-500">
                            {protocolMetrics.hpToken.stakingAPR}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary">
                          <Zap className="w-4 h-4 mr-2" />
                          Buy $HP
                        </Button>
                        <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                          <Coins className="w-4 h-4 mr-2" />
                          Stake
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Claim Ratio & Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-accent-teal" />
                      Claim Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted">Claim Ratio</span>
                        <span className="text-3xl font-bold text-primary">
                          {protocolMetrics.claimRatio.value}
                        </span>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-muted">Total Claims Approved & Paid</span>
                          <span className="text-sm font-semibold text-green-500">
                            {protocolMetrics.claimRatio.totalApproved}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-muted">Total Amount Claimed</span>
                          <span className="text-sm font-semibold text-text-primary">
                            ${protocolMetrics.claimRatio.totalClaimed}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-text-muted italic">
                            Claims processed off-chain by TPAs, settlements on-chain
                          </p>
                        </div>
                      </div>

                      <div className="w-full h-2 bg-surface rounded-full overflow-hidden mt-4">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                          style={{ width: protocolMetrics.claimRatio.value }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Personal Dashboard - Only show when wallet connected */}
            {mounted && isConnected && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold text-text-primary mb-2">My Portfolio</h2>
                  <p className="text-text-muted">Your personal policies, claims, and rebate forecast</p>
                </motion.div>

                {/* User Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Staked Balance */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Card className="border-border hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-text-muted flex items-center gap-2">
                          <Coins className="w-4 h-4" />
                          Staked $HP
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary mb-1">
                          {userMetrics.stakedBalance.hp}
                        </div>
                        <div className="text-sm text-text-muted">
                          ≈ ${userMetrics.stakedBalance.usdValue} USD
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Personal Claim Ratio */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                  >
                    <Card className="border-border hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-text-muted flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          My Claim Ratio
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-500 mb-1">
                          {userMetrics.personalClaimRatio.value}
                        </div>
                        <div className="text-sm text-text-muted">
                          ${userMetrics.personalClaimRatio.totalClaimed} / ${userMetrics.personalClaimRatio.totalAvailable}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Active Policies Count */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Card className="border-border hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-text-muted flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Active Policies
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary mb-1">
                          {userMetrics.activePolicies.length}
                        </div>
                        <div className="text-sm text-text-muted">
                          {userMetrics.personalClaimRatio.totalApproved} claims approved & paid
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Forecast Rebate */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95 }}
                  >
                    <Card className="border-border hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-text-muted flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Forecast Rebate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-accent-teal mb-1">
                          ${userMetrics.forecastRebate.estimated}
                        </div>
                        <div className="text-xs text-text-muted">
                          {userMetrics.forecastRebate.confidence} confidence
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Active Policies List & Rebate Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Active Policies List */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="lg:col-span-2"
                  >
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          My Active Policies
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {userMetrics.activePolicies.map((policy) => (
                            <div
                              key={policy.id}
                              className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all bg-surface/30"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-text-primary">{policy.type}</h3>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                      {policy.status}
                                    </span>
                                  </div>
                                  <div className="text-sm text-text-muted">NFT ID: {policy.id}</div>
                                  <div className="text-sm text-text-muted">Card: {policy.cardNumber}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm text-text-muted">Days Remaining</div>
                                  <div className="text-lg font-bold text-primary">{policy.daysRemaining}</div>
                                </div>
                              </div>

                              <div className="mb-3 pb-3 border-b border-border">
                                <div className="text-xs text-text-muted mb-1">TPA Provider</div>
                                <div className="text-sm font-medium text-text-primary">{policy.tpaProvider}</div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <div className="text-xs text-text-muted mb-1">Commitment</div>
                                  <div className="text-sm font-semibold text-text-primary">{policy.commitment}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-text-muted mb-1">Total Coverage</div>
                                  <div className="text-sm font-semibold text-text-primary">{policy.totalCoverageLimit}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-text-muted mb-1">Start Date</div>
                                  <div className="text-sm text-text-primary">{policy.startDate}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-text-muted mb-1">End Date</div>
                                  <div className="text-sm text-text-primary">{policy.endDate}</div>
                                </div>
                              </div>

                              {/* Benefit Categories */}
                              <div className="pt-3 border-t border-border mb-3">
                                <div className="text-xs text-text-muted mb-2">Benefit Coverage</div>
                                <div className="grid grid-cols-2 gap-2">
                                  {policy.benefits.map((benefit: Benefit) => (
                                    <div key={benefit.category} className="text-xs">
                                      <span className="font-medium text-text-primary">{benefit.category}:</span>{" "}
                                      <span className="text-text-muted">{benefit.annualLimit}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border mb-3">
                                <div>
                                  <div className="text-xs text-text-muted mb-1">Utilization Ratio</div>
                                  <div className="text-sm font-semibold text-accent">{policy.utilization}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-text-muted mb-1">Current APR</div>
                                  <div className="text-sm font-semibold text-green-500">{policy.currentAPR}</div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-primary/30 hover:bg-primary/10"
                                  onClick={() => setSelectedPolicy(policy)}
                                >
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
                                  onClick={() => window.open(policy.tpaPortalUrl, '_blank')}
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  Submit Claim
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Rebate Breakdown & Claims */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.05 }}
                    className="space-y-6"
                  >
                    {/* Forecast Rebate Breakdown */}
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <DollarSign className="w-5 h-5 text-accent-teal" />
                          Rebate Breakdown
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-text-muted mb-2">Estimated Total</div>
                            <div className="text-3xl font-bold bg-gradient-to-r from-accent-teal to-primary bg-clip-text text-transparent">
                              ${userMetrics.forecastRebate.estimated}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-text-muted">Unused Balance (Uᵢ)</span>
                              <span className="text-sm font-semibold text-text-primary">
                                ${userMetrics.forecastRebate.breakdown.unusedBalance}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-text-muted">Rebate Allocation (RBᵢ)</span>
                              <span className="text-sm font-semibold text-primary">
                                ${userMetrics.forecastRebate.breakdown.rebateAllocation}
                              </span>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border">
                            <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              High Confidence Forecast
                            </div>
                            <p className="text-xs text-text-muted">
                              Based on current utilization and protocol surplus
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Claims Status */}
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Activity className="w-5 h-5 text-primary" />
                          Claims Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-muted">Total Approved & Paid</span>
                            <span className="text-sm font-semibold text-green-500">
                              {userMetrics.personalClaimRatio.totalApproved}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-muted">Total Amount</span>
                            <span className="text-sm font-semibold text-text-primary">
                              ${userMetrics.personalClaimRatio.totalClaimed}
                            </span>
                          </div>

                          <div className="pt-3 border-t border-border">
                            <p className="text-xs text-text-muted italic">
                              Claims processed off-chain by TPA, settled on-chain
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Claim History Modal */}
      {selectedPolicy && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPolicy(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-2">
                    Policy Details
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted">{selectedPolicy.type}</span>
                    <span className="text-sm text-text-muted">•</span>
                    <span className="text-sm text-text-muted">NFT ID: {selectedPolicy.id}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPolicy(null)}
                  className="border-border"
                >
                  Close
                </Button>
              </div>

              {/* Policy Summary */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-surface/30 rounded-lg border border-border mb-6">
                <div>
                  <div className="text-xs text-text-muted mb-1">Card Number</div>
                  <div className="text-sm font-semibold text-text-primary">{selectedPolicy.cardNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">TPA Provider</div>
                  <div className="text-sm font-semibold text-text-primary">{selectedPolicy.tpaProvider}</div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">Utilization</div>
                  <div className="text-sm font-semibold text-accent">{selectedPolicy.utilization}</div>
                </div>
              </div>

              {/* Benefit Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Benefit Limits & Coverage
                </h3>
                <div className="grid gap-4">
                  {selectedPolicy.benefits.map((benefit: Benefit) => (
                    <div key={benefit.category} className="p-4 rounded-lg border border-border bg-surface/20">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-text-primary">{benefit.category}</h4>
                        <span className="text-sm font-semibold text-primary">{benefit.annualLimit}</span>
                      </div>
                      <div className="space-y-2">
                        {benefit.subBenefits.map((sub: SubBenefit, idx: number) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-text-muted">{sub.name}</span>
                            <span className="text-text-primary font-medium">{sub.limit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Claim History List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Claims Approved & Paid ({selectedPolicy.claimHistory.length})
                </h3>

                {selectedPolicy.claimHistory.length > 0 ? (
                  selectedPolicy.claimHistory.map((claim: ClaimHistory, index: number) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all bg-surface/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-text-primary">{claim.claimNumber}</h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                              {claim.status}
                            </span>
                          </div>
                          <div className="text-sm text-text-muted">{claim.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-500">{claim.approvedAmount}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-text-muted">
                    No claims have been submitted for this policy yet.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
