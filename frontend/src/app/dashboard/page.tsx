'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { LayoutDashboard, Image as ImageIcon, Users, CheckCircle, Package } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const stats = [
    { name: 'Total Artworks', value: '12', icon: ImageIcon, color: 'text-blue-600' },
    { name: 'Pending Approval', value: '3', icon: CheckCircle, color: 'text-amber-600' },
    { name: 'Total Sales', value: '$1,200', icon: Package, color: 'text-green-600' },
    { name: 'Active Users', value: '45', icon: Users, color: 'text-indigo-600', roleRequired: ['Admin', 'Sub Admin'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Welcome, {user.name}</h1>
          <p className="text-zinc-500">Role: <span className="font-semibold text-indigo-600">{user.role}</span></p>
        </div>
        <div className="flex space-x-4">
          {user.role === 'User' && (
            <Button onClick={() => router.push('/dashboard/upload')}>Upload Artwork</Button>
          )}
          {user.role === 'Admin' && (
            <Button variant="secondary" onClick={() => router.push('/dashboard/moderate')}>Moderate Content</Button>
          )}
          {(user.role === 'Admin' || user.role === 'Sub Admin') && (
            <Button variant="outline" onClick={() => router.push('/dashboard/users')}>Manage Users</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.filter(s => !s.roleRequired || s.roleRequired.includes(user.role)).map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-zinc-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">{stat.name}</p>
                <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-6">Recent Activity</h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">JD</div>
            <div>
              <p className="text-sm text-zinc-900 font-medium">New artwork "Digital Horizon" uploaded by you.</p>
              <p className="text-xs text-zinc-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">SA</div>
            <div>
              <p className="text-sm text-zinc-900 font-medium">Your artwork "Cyberpunk Street" was approved.</p>
              <p className="text-xs text-zinc-500">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
