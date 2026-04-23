'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '../ui/Button';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import api from '@/services/api';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
            CanvasCart
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-zinc-600 hover:text-indigo-600 font-medium">Marketplace</Link>
            {user && (
              <Link href="/dashboard" className="text-zinc-600 hover:text-indigo-600 font-medium">Dashboard</Link>
            )}
            <Link href="/cart" className="relative text-zinc-600 hover:text-indigo-600">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-zinc-900 font-medium">Hi, {user.name}</span>
                <button onClick={handleLogout} className="text-zinc-600 hover:text-red-600">
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 py-4 px-4 space-y-4 shadow-xl">
          <Link href="/marketplace" className="block text-zinc-600 font-medium">Marketplace</Link>
          {user && <Link href="/dashboard" className="block text-zinc-600 font-medium">Dashboard</Link>}
          <Link href="/cart" className="block text-zinc-600 font-medium">Cart</Link>
          {user ? (
            <button onClick={handleLogout} className="w-full text-left text-red-600 font-medium">Logout</button>
          ) : (
            <div className="space-y-2 pt-2 border-t">
              <Link href="/login" className="block"><Button variant="outline" className="w-full">Login</Button></Link>
              <Link href="/register" className="block"><Button className="w-full">Get Started</Button></Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
