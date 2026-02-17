'use client';

import { useState } from 'react';
import { Menu, X, LogOut, BookOpen, ClipboardCheck, User, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const pathname = usePathname();

    // Mock student data
    const studentInfo = {
        name: 'Emma Johnson',
        email: 'emma.j@student.edu',
        class: 'Grade 10A',
        studentId: 'STU-2025-001'
    };

    const navItems = [
        { name: 'My Courses', href: '/student', icon: BookOpen },
        { name: 'Quizzes', href: '/student/quizzes', icon: ClipboardCheck },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-indigo-900 to-purple-900 text-white transform transition-all duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${isCollapsed ? 'w-20' : 'w-72'}`}>
                <div className="p-6 border-b border-indigo-800">
                    <div className="flex items-center justify-between">
                        {!isCollapsed && (
                            <div className="animate-fadeIn">
                                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">EduPortal</h1>
                                <p className="text-sm text-indigo-300 mt-1">Student Portal</p>
                            </div>
                        )}
                        {isCollapsed && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center font-bold animate-fadeIn shadow-lg ring-2 ring-indigo-400/20">
                                E
                            </div>
                        )}
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-indigo-300 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-800/50 hover:bg-indigo-700 text-indigo-300 hover:text-white transition-all duration-200"
                        >
                            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>
                    </div>
                </div>

                <nav className="p-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 ring-1 ring-white/10' : 'text-indigo-200 hover:bg-indigo-800/60 hover:text-white'} ${isCollapsed ? 'justify-center px-0' : ''}`}
                                title={isCollapsed ? item.name : ''}
                            >
                                <Icon size={20} className={`shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                {!isCollapsed && <span className="font-medium animate-fadeIn">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-800/50 bg-indigo-900/40 backdrop-blur-md">
                    <div className={`flex items-center gap-3 bg-indigo-800/40 rounded-xl transition-all duration-300 hover:bg-indigo-800/60 ${isCollapsed ? 'p-1 justify-center' : 'p-3'}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold shrink-0 shadow-lg ring-1 ring-white/20">
                            {studentInfo.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0 animate-fadeIn text-left">
                                <p className="text-sm font-bold truncate">{studentInfo.name}</p>
                                <p className="text-xs text-indigo-300 truncate">{studentInfo.class}</p>
                            </div>
                        )}
                    </div>
                    <button className={`w-full flex items-center gap-2 mt-3 text-indigo-300 hover:text-white hover:bg-indigo-800/40 rounded-xl transition-all ${isCollapsed ? 'justify-center py-3' : 'px-4 py-2.5'}`} title={isCollapsed ? 'Logout' : ''}>
                        <LogOut size={18} className="shrink-0" />
                        {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
                {/* Mobile Header */}
                <header className="lg:hidden bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <button onClick={() => setSidebarOpen(true)} className="text-slate-600 hover:text-indigo-600 transition-colors">
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">EduPortal</h2>
                        <div className="w-6" /> {/* Spacer */}
                    </div>
                </header>

                {/* Common Header for all views */}
                <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 hidden lg:block">
                    <div className="px-8 py-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                {pathname === '/student' ? `Welcome, ${studentInfo.name.split(' ')[0]}! 👋` : 'Academic Dashboard'}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium mt-0.5">
                                {pathname === '/student' ? 'Here\'s what\'s happening in your courses today.' : 'Track your performance and assessments.'}
                            </p>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white transition-transform group-hover:scale-105">
                                    {studentInfo.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="text-left hidden xl:block">
                                    <p className="text-sm font-bold text-slate-900 leading-none">{studentInfo.name}</p>
                                    <p className="text-[10px] font-bold text-indigo-500 mt-1 uppercase tracking-tight">{studentInfo.studentId}</p>
                                </div>
                            </button>

                            {showProfileDropdown && (
                                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 animate-fadeIn ring-1 ring-black/5 z-[60]">
                                    <div className="px-6 py-4 border-b border-slate-50">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 text-lg font-black">
                                                {studentInfo.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-base font-black text-slate-900 leading-none">{studentInfo.name}</p>
                                                <p className="text-xs text-slate-400 font-semibold mt-1">{studentInfo.email}</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
                                            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Member ID</span>
                                            <span className="text-[10px] font-black text-indigo-600 tracking-wider whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">{studentInfo.studentId}</span>
                                        </div>
                                    </div>
                                    <div className="px-2 py-2">
                                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group">
                                            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                                            <span className="text-sm font-black tracking-tight">Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                />
            )}

            {/* Overlay for profile dropdown click-outside */}
            {showProfileDropdown && (
                <div
                    onClick={() => setShowProfileDropdown(false)}
                    className="fixed inset-0 z-30"
                />
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
