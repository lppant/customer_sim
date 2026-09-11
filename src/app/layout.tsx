import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CustomerSim Banking — Multimodal User Simulators & Alignment',
  description: 'Benchmarking and Aligning Multimodal Language Models as Retail Banking User Simulators (arXiv:2605.08334)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col lg:flex-row bg-[#F8F8F6] text-[#131714]">
        {/* Left Sidebar Navigation */}
        <Navigation />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col min-h-screen">
          <main className="flex-1">
            {children}
          </main>

          {/* Clean Footer */}
          <footer className="border-t border-[#E6E6E0] bg-white py-4 px-6 text-xs text-gray-500 font-mono">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>CustomerSim Banking · Dual-Agent User Simulation Benchmark</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
