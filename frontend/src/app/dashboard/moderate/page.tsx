'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { ShieldCheck, Clock, Check, X, History, Info } from 'lucide-react';

const ModerationPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [artworks, setArtworks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchArtworks = async () => {
    try {
      const { data } = await api.get('/artworks/admin');
      setArtworks(data);
    } catch (error) {
      toast.error('Failed to load artworks for moderation');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!user || user.role !== 'Admin') {
      router.push('/dashboard');
      return;
    }
    fetchArtworks();
  }, [user, router]);

  const handleModerate = async (id, status) => {
    try {
      await api.put(`/artworks/${id}/moderate`, { status });
      toast.success(`Artwork ${status} successfully`);
      fetchArtworks(); // Refresh the list
    } catch (error) {
      toast.error('Moderation failed');
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading content...</div>;

  const pendingArtworks = artworks.filter(a => a.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Moderate Content</h1>
          <p className="text-zinc-500">Review and approve pending artworks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Moderation List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-amber-500" />
            Pending Review ({pendingArtworks.length})
          </h2>
          
          {pendingArtworks.length === 0 ? (
            <div className="bg-zinc-50 border border-zinc-100 p-10 rounded-2xl text-center">
              <p className="text-zinc-500">No artworks pending review at this time.</p>
            </div>
          ) : (
            pendingArtworks.map((art) => (
              <div key={art._id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">
                <img src={art.image} alt={art.title} className="h-32 w-32 object-cover rounded-xl" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-zinc-900">{art.title}</h3>
                  <p className="text-sm text-zinc-500 mb-2">By {art.artist?.name || 'Unknown'}</p>
                  <p className="text-xs text-zinc-400 line-clamp-2">{art.description}</p>
                </div>
                <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleModerate(art._id, 'approved')}>
                    <Check className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-100" onClick={() => handleModerate(art._id, 'rejected')}>
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Moderation Activity Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
            <div className="flex items-center space-x-2 mb-6">
              <History className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-zinc-900">Moderation Activity</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                <div className="p-1 bg-green-100 rounded text-green-600">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-zinc-900 font-medium italic">"Cyberpunk Sunset"</p>
                  <p className="text-xs text-zinc-500">Approved by Admin</p>
                  <p className="text-[10px] text-zinc-400 mt-1">10 mins ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                <div className="p-1 bg-red-100 rounded text-red-600">
                  <X className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-zinc-900 font-medium italic">"Untitled Sketch"</p>
                  <p className="text-xs text-zinc-500">Rejected (Inappropriate)</p>
                  <p className="text-[10px] text-zinc-400 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                <Info className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-zinc-900 font-medium">Policy Update</p>
                  <p className="text-xs text-zinc-500">New AI content guidelines applied</p>
                  <p className="text-[10px] text-zinc-400 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModerationPage;
