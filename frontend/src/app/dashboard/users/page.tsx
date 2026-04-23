'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { Users, History, UserCheck, ShieldAlert } from 'lucide-react';

const UsersManagementPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [users, setUsers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user || (user.role !== 'Admin' && user.role !== 'Sub Admin')) {
      router.push('/dashboard');
      return;
    }

    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (error) {
        toast.error('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [user, router]);

  if (isLoading) return <div className="p-10 text-center">Loading users...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
          <Users className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Manage Users</h1>
          <p className="text-zinc-500">View and manage all registered accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-6 border-b border-zinc-100">
            <h2 className="text-lg font-bold text-zinc-900">Registered Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {users.map((u: any) => (
                  <tr key={u._id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">{u.name}</td>
                    <td className="px-6 py-4 text-zinc-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        u.role === 'Admin' ? 'bg-red-100 text-red-600' : 
                        u.role === 'Sub Admin' ? 'bg-amber-100 text-amber-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-sm">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Activity Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
            <div className="flex items-center space-x-2 mb-6">
              <History className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-zinc-900">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                <UserCheck className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <p className="text-sm text-zinc-900 font-medium">New user registered</p>
                  <p className="text-xs text-zinc-500">testadmin@example.com joined</p>
                  <p className="text-[10px] text-zinc-400 mt-1">2 mins ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                <ShieldAlert className="h-5 w-5 text-amber-500 mt-1" />
                <div>
                  <p className="text-sm text-zinc-900 font-medium">Role Updated</p>
                  <p className="text-xs text-zinc-500">hb3@gmail.com promoted to Admin</p>
                  <p className="text-[10px] text-zinc-400 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                <UserCheck className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <p className="text-sm text-zinc-900 font-medium">Successful Login</p>
                  <p className="text-xs text-zinc-500">testsub@example.com signed in</p>
                  <p className="text-[10px] text-zinc-400 mt-1">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagementPage;
