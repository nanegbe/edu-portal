'use client';

import { useState } from 'react';
import { Menu, X, LogOut, BookOpen, Users, TrendingUp, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
        { name: 'Teachers', href: '/dashboard/teachers', icon: Users },
        { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
        { name: 'Reports', href: '/dashboard/reports', icon: TrendingUp, disabled: true },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-all duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${isCollapsed ? 'w-20' : 'w-72'}`}>
                <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                        {!isCollapsed && (
                            <div className="animate-fadeIn">
                                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">EduPortal</h1>
                                <p className="text-sm text-slate-400 mt-1">Principal Dashboard</p>
                            </div>
                        )}
                        {isCollapsed && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center font-bold animate-fadeIn">
                                E
                            </div>
                        )}
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
                        >
                            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        if (item.disabled) {
                            return (
                                <div key={item.name}>
                                    {!isCollapsed && <div className="mt-4 px-4 py-2 text-xs text-slate-500 uppercase tracking-wider animate-fadeIn">Coming Soon</div>}
                                    {isCollapsed && <div className="h-px bg-slate-700 my-4 mx-2" />}
                                    <button disabled className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 cursor-not-allowed opacity-50 ${isCollapsed ? 'justify-center px-2' : ''}`} title={isCollapsed ? item.name : ''}>
                                        <Icon size={20} className="shrink-0" />
                                        {!isCollapsed && <span className="font-medium">{item.name}</span>}
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-700'} ${isCollapsed ? 'justify-center px-2' : ''}`}
                                title={isCollapsed ? item.name : ''}
                            >
                                <Icon size={20} className="shrink-0" />
                                {!isCollapsed && <span className="font-medium animate-fadeIn">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                    <div className={`flex items-center gap-3 bg-slate-700 rounded-lg transition-all ${isCollapsed ? 'p-1 justify-center' : 'p-3'}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
                            AP
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0 animate-fadeIn text-left">
                                <p className="text-sm font-medium truncate">Alex Peterson</p>
                                <p className="text-xs text-slate-400 truncate">Principal</p>
                            </div>
                        )}
                    </div>
                    <button className={`w-full flex items-center gap-2 mt-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all ${isCollapsed ? 'justify-center py-3' : 'px-4 py-2'}`} title={isCollapsed ? 'Logout' : ''}>
                        <LogOut size={18} className="shrink-0" />
                        {!isCollapsed && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
                {/* Mobile Header */}
                <header className="lg:hidden bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <button onClick={() => setSidebarOpen(true)} className="text-slate-600 hover:text-slate-900">
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-bold text-slate-900">EduPortal</h2>
                        <div className="w-6" /> {/* Spacer */}
                    </div>
                </header>

                {children}
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
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
