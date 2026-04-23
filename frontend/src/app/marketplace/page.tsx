'use client';

import React from 'react';
import Link from 'next/link';
import api from '@/services/api';
import Button from '@/components/ui/Button';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface Artwork {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  artist: { name: string };
}

const MarketplacePage = () => {
  const [artworks, setArtworks] = React.useState<Artwork[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const { data } = await api.get('/artworks');
        setArtworks(data);
      } catch (error) {
        toast.error('Failed to load artworks');
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Marketplace</h1>
          <p className="text-zinc-500">Discover unique digital art from creators around the world.</p>
        </div>
        
        <div className="flex w-full md:w-auto space-x-4">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search art..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl h-80 border border-zinc-100" />
          ))}
        </div>
      ) : artworks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-zinc-100">
          <p className="text-zinc-500 text-lg">No artworks found yet. Be the first to upload!</p>
          <Link href="/dashboard" className="mt-4 inline-block text-indigo-600 font-semibold">Go to Dashboard</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <div key={artwork._id} className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                {/* Image placeholder or real image */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-300 font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
                  {artwork.title.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-zinc-900">{artwork.title}</h3>
                  <span className="text-indigo-600 font-bold">${artwork.price}</span>
                </div>
                <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{artwork.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-zinc-200" />
                    <span className="text-xs font-medium text-zinc-700">{artwork.artist.name}</span>
                  </div>
                  <Button size="sm" variant="secondary"><ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
