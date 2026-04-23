'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { Upload, ImageIcon, Sparkles } from 'lucide-react';

const UploadPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: 'Digital Art',
    useAI: false
  });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/artworks', formData);
      toast.success('Artwork uploaded successfully! Waiting for moderation.');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
          <Upload className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Upload Artwork</h1>
          <p className="text-zinc-500">Share your creation with the world</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
          <input 
            type="text" 
            required 
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Price ($)</label>
            <input 
              type="number" 
              required 
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
            <select 
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>Digital Art</option>
              <option>Oil Painting</option>
              <option>Photography</option>
              <option>Sketch</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Image URL</label>
          <input 
            type="text" 
            required 
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
          <textarea 
            rows={4}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <input 
            type="checkbox" 
            id="useAI" 
            className="h-5 w-5 text-indigo-600 rounded"
            checked={formData.useAI}
            onChange={(e) => setFormData({...formData, useAI: e.target.checked})}
          />
          <label htmlFor="useAI" className="text-sm text-indigo-900 font-medium flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-indigo-600" />
            Enhance with AI (Auto-generate description & tags)
          </label>
        </div>

        <Button type="submit" className="w-full py-3 text-lg" isLoading={isLoading}>
          Upload Artwork
        </Button>
      </form>
    </div>
  );
};

export default UploadPage;
