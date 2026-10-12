import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { 
  Shield, Users, MessageSquare, AlertTriangle, 
  CheckCircle, Trash2, Ban, RefreshCw, Search, 
  ArrowUpRight, Eye 
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { 
    currentUser, users, posts, reports, 
    dismissReport, removeReportedPost, toggleSuspendUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reports' | 'users' | 'activity'>('reports');
  const [reportFilter, setReportFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');
  const [userSearch, setUserSearch] = useState('');

  // Total metrics
  const totalUsersCount = users.length;
  const totalPostsCount = posts.length;
  const totalCommentsCount = posts.reduce((acc, p) => acc + p.commentsCount, 0);
  const totalLikesCount = posts.reduce((acc, p) => acc + p.likesCount, 0);
  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;

  const filteredReports = reports.filter(r => {
    if (reportFilter === 'all') return true;
    return r.status === reportFilter;
  });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-12">
      {/* Admin Header */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-6 shadow-xs flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7957E8] to-[#5B8DEF] text-white flex items-center justify-center font-bold shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#20212A]">Platform Moderation Console</h1>
            <p className="text-xs text-[#74788A]">
              Administrative controls, content hygiene, and community oversight.
            </p>
          </div>
        </div>

        <div className="text-xs text-[#74788A] bg-[#FAFAFC] border border-[#EAEAEF] px-3 py-1.5 rounded-xl font-mono tabular-nums">
          Logged as Administrator: {currentUser.name}
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] font-bold text-[#74788A] uppercase tracking-wider">Total Members</p>
          <p className="text-2xl font-extrabold text-[#20212A] font-mono tabular-nums mt-1">
            {totalUsersCount}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12% this week</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] font-bold text-[#74788A] uppercase tracking-wider">Live Posts</p>
          <p className="text-2xl font-extrabold text-[#20212A] font-mono tabular-nums mt-1">
            {totalPostsCount}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>Active threads</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] font-bold text-[#74788A] uppercase tracking-wider">Total Reactions</p>
          <p className="text-2xl font-extrabold text-[#20212A] font-mono tabular-nums mt-1">
            {totalLikesCount + totalCommentsCount}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#7957E8] font-medium mt-1">
            <span>{totalCommentsCount} comments</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] font-bold text-[#74788A] uppercase tracking-wider">Action Queue</p>
          <p className={`text-2xl font-extrabold font-mono tabular-nums mt-1 ${
            pendingReportsCount > 0 ? 'text-amber-600' : 'text-emerald-600'
          }`}>
            {pendingReportsCount}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#74788A] font-medium mt-1">
            <span>{pendingReportsCount > 0 ? 'Review required' : 'All clear'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-1.5 shadow-xs flex items-center gap-1">
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Reported Content Queue ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'users'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>User Management ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'activity'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A]'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>System Activity Log</span>
        </button>
      </div>

      {/* Tab 1: Reported Content Queue */}
      {activeTab === 'reports' && (
        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
              Flagged Items for Moderation
            </h2>

            <div className="flex items-center gap-1 bg-[#FAFAFC] border border-[#EAEAEF] p-1 rounded-xl">
              {(['all', 'pending', 'resolved', 'dismissed'] as const).map(rf => (
                <button
                  key={rf}
                  onClick={() => setReportFilter(rf)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg capitalize transition-colors ${
                    reportFilter === rf ? 'bg-white text-[#20212A] shadow-xs' : 'text-[#74788A]'
                  }`}
                >
                  {rf}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <div
                  key={report.id}
                  className="p-4 bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md uppercase text-[10px]">
                        {report.reason.replace('_', ' ')}
                      </span>
                      <span className="text-[#74788A]">Reported by {report.reporter.name}</span>
                      <span className="text-[#74788A]">·</span>
                      <span className="text-[#74788A]">Status: {report.status}</span>
                    </div>

                    {report.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dismissReport(report.id)}
                          className="px-3 py-1 bg-white border border-[#EAEAEF] hover:bg-slate-100 text-xs font-semibold text-[#20212A] rounded-lg transition-colors"
                        >
                          Dismiss
                        </button>
                        <button
                          onClick={() => removeReportedPost(report.id)}
                          className="px-3 py-1 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 transition-colors shadow-2xs"
                        >
                          Remove Content
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-white border border-[#EAEAEF] rounded-xl text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <Avatar src={report.post.author.avatar} name={report.post.author.name} size="xs" />
                      <span className="font-semibold text-[#20212A]">{report.post.author.name}</span>
                      <span className="text-[#74788A]">@{report.post.author.username}</span>
                    </div>
                    <p className="text-[#20212A] leading-relaxed pt-1">
                      {report.post.content}
                    </p>
                  </div>

                  {report.details && (
                    <p className="text-[11px] text-[#74788A] italic">
                      Reporter note: "{report.details}"
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#74788A]">
                No reports matching filter criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: User Management Table */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
              Directory of Accounts
            </h2>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#74788A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="Filter users..."
                className="bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EAEAEF] text-[#74788A] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3 font-mono tabular-nums">Followers</th>
                  <th className="py-2.5 px-3 font-mono tabular-nums">Posts</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEF]/70">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-[#FAFAFC]/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={u.avatar} name={u.name} size="sm" />
                        <div>
                          <p className="font-bold text-[#20212A]">{u.name}</p>
                          <p className="text-[11px] text-[#74788A]">@{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {u.isAdmin ? (
                        <span className="text-[10px] bg-[#7957E8]/10 text-[#7957E8] px-2 py-0.5 rounded-md font-bold">
                          Admin
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#74788A]">Member</span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums text-[#20212A]">
                      {u.followersCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums text-[#20212A]">
                      {u.postsCount}
                    </td>
                    <td className="py-3 px-3">
                      {u.isSuspended ? (
                        <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md font-bold">
                          Suspended
                        </span>
                      ) : (
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {u.id !== currentUser.id && (
                        <button
                          onClick={() => toggleSuspendUser(u.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            u.isSuspended
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          }`}
                        >
                          {u.isSuspended ? 'Reactivate' : 'Suspend'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: System Activity Log */}
      {activeTab === 'activity' && (
        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Audit Trail & Event Log
          </h2>

          <div className="space-y-2.5">
            {[
              { event: 'Content rule audit pass', time: '12m ago', status: 'Healthy' },
              { event: 'User @devonpatel published new post in Photography Club', time: '16h ago', status: 'Clean' },
              { event: 'Spam flag generated for sample demonstration queue', time: '1d ago', status: 'Reviewed' },
              { event: 'System initialization and schema seed verification', time: '2d ago', status: 'Verified' }
            ].map((log, i) => (
              <div key={i} className="p-3 bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[#20212A] font-medium">{log.event}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#74788A]">
                  <span>{log.status}</span>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
