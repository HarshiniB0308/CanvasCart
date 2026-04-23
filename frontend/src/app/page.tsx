'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Sparkles, Shield, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative isolate">
      {/* Hero Section */}
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                The Future of Art is AI-Enhanced
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600">
                Discover, collect, and sell stunning AI-generated and enhanced artwork. The world's first premium marketplace for the next generation of creators.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/marketplace">
                  <Button size="lg">Explore Marketplace</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg">Start Creating</Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 flow-root sm:mt-24"
          >
            <div className="relative -m-2 rounded-xl bg-zinc-900/5 p-2 ring-1 ring-inset ring-zinc-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="bg-indigo-50 h-[400px] rounded-lg border border-indigo-100 flex items-center justify-center overflow-hidden">
                <div className="text-indigo-300 text-9xl font-bold opacity-20 rotate-12">CANVASCART</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Fast & Secure</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Everything you need to trade AI art
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {[
                { name: 'AI Optimization', description: 'Auto-description and tagging for your artwork.', icon: Sparkles },
                { name: 'Secure Payments', description: 'Safe and encrypted transactions for every piece.', icon: Shield },
                { name: 'Instant Downloads', description: 'Get high-resolution files immediately after purchase.', icon: Zap },
                { name: 'Global reach', description: 'Showcase your work to collectors worldwide.', icon: Globe },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-zinc-900">
                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
