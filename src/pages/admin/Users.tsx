import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import { Users, Search, Plus, ShieldCheck, Mail } from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';

export const AdminUsers: React.FC = () => {
  const { addToast } = useEduData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN'>('STUDENT');

  const [userList, setUserList] = useState([
    { id: '1', name: 'Alex Johnson', email: 'alex.johnson@edunexa.ai', role: 'STUDENT', status: 'ACTIVE' },
    { id: '2', name: 'Ms. Sarah Chen', email: 'sarah.chen@edunexa.ai', role: 'TEACHER', status: 'ACTIVE' },
    { id: '3', name: 'Robert Johnson', email: 'robert.johnson@edunexa.ai', role: 'PARENT', status: 'ACTIVE' },
    { id: '4', name: 'Dr. Emma Wilson', email: 'admin@edunexa.ai', role: 'ADMIN', status: 'ACTIVE' },
    { id: '5', name: 'Maya Patel', email: 'maya.patel@edunexa.ai', role: 'STUDENT', status: 'ACTIVE' },
    { id: '6', name: 'Lucas Silva', email: 'lucas.silva@edunexa.ai', role: 'STUDENT', status: 'ACTIVE' },
  ]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserList(prev => [{ id: Date.now().toString(), name, email, role, status: 'ACTIVE' }, ...prev]);
    setShowAddModal(false);
    setName('');
    setEmail('');
    addToast(`Added user ${name} (${role}) to directory`, 'success');
  };

  const filtered = userList.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Directory & Roles</h1>
          <p className="text-xs text-slate-300 mt-1">Manage platform accounts, permissions, and role-based access.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New User</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111831] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 rounded-r-xl">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-bold text-white">{u.name}</td>
                  <td className="p-3 text-slate-300">{u.email}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-[#A78BFA]">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <form onSubmit={handleAddUser} className="bg-[#171F3A] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Provision Account</h3>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Assigned Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none"
              >
                <option value="STUDENT">STUDENT</option>
                <option value="TEACHER">TEACHER</option>
                <option value="PARENT">PARENT</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#7657F6] text-xs font-bold text-white"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
