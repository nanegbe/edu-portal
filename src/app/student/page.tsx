'use client';

import { useState } from 'react';
import { BookOpen, ChevronRight, File, Video, Link as LinkIcon, Download, Eye, User } from 'lucide-react';

export default function StudentDashboard() {
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const courses = [
        {
            id: 1,
            title: 'Mathematics',
            subtitle: 'Algebra II',
            teacher: 'Sarah Johnson',
            color: 'from-blue-400 to-cyan-500',
            icon: '📐',
            materials: [
                { id: 1, name: 'Chapter 5: Quadratic Functions', type: 'pdf', size: '2.4 MB', uploadDate: '2025-11-01' },
                { id: 2, name: 'Factoring Techniques Tutorial', type: 'video', duration: '15:30', uploadDate: '2025-10-28' },
                { id: 3, name: 'Khan Academy - Quadratics', type: 'link', url: 'https://khanacademy.org', uploadDate: '2025-10-25' },
                { id: 4, name: 'Homework Assignment 12', type: 'pdf', size: '0.8 MB', uploadDate: '2025-10-20' },
            ]
        },
        {
            id: 2,
            title: 'Physics',
            subtitle: 'Mechanics & Waves',
            teacher: 'Michael Chen',
            color: 'from-purple-400 to-pink-500',
            icon: '⚡',
            materials: [
                { id: 5, name: 'Newton\'s Laws of Motion', type: 'pdf', size: '3.1 MB', uploadDate: '2025-11-03' },
                { id: 6, name: 'Force and Acceleration Demo', type: 'video', duration: '12:45', uploadDate: '2025-11-01' },
                { id: 7, name: 'PhET Simulations', type: 'link', url: 'https://phet.colorado.edu', uploadDate: '2025-10-29' },
            ]
        },
        {
            id: 3,
            title: 'English Literature',
            subtitle: 'American Classics',
            teacher: 'Emily Rodriguez',
            color: 'from-green-400 to-emerald-500',
            icon: '📚',
            materials: [
                { id: 8, name: 'To Kill a Mockingbird - Study Guide', type: 'pdf', size: '1.8 MB', uploadDate: '2025-11-02' },
                { id: 9, name: 'Character Analysis Workshop', type: 'video', duration: '22:15', uploadDate: '2025-10-30' },
                { id: 10, name: 'Themes and Symbolism Notes', type: 'pdf', size: '1.2 MB', uploadDate: '2025-10-28' },
            ]
        },
        {
            id: 4,
            title: 'Chemistry',
            subtitle: 'Organic Chemistry',
            teacher: 'David Thompson',
            color: 'from-orange-400 to-red-500',
            icon: '🧪',
            materials: [
                { id: 11, name: 'Molecular Structures Guide', type: 'pdf', size: '2.7 MB', uploadDate: '2025-11-04' },
                { id: 12, name: 'Bonding Types Explained', type: 'video', duration: '18:20', uploadDate: '2025-11-02' },
            ]
        },
        {
            id: 5,
            title: 'History',
            subtitle: 'World History',
            teacher: 'Lisa Anderson',
            color: 'from-amber-400 to-yellow-500',
            icon: '🌍',
            materials: [
                { id: 13, name: 'World War II Timeline', type: 'pdf', size: '4.2 MB', uploadDate: '2025-11-03' },
                { id: 14, name: 'Documentary: The War Years', type: 'video', duration: '45:00', uploadDate: '2025-11-01' },
                { id: 15, name: 'BBC History Resources', type: 'link', url: 'https://bbc.co.uk/history', uploadDate: '2025-10-27' },
            ]
        },
        {
            id: 6,
            title: 'Biology',
            subtitle: 'Cell Biology',
            teacher: 'Robert Williams',
            color: 'from-teal-400 to-cyan-500',
            icon: '🔬',
            materials: [
                { id: 16, name: 'Cell Structure and Function', type: 'pdf', size: '3.5 MB', uploadDate: '2025-11-04' },
                { id: 17, name: 'Mitosis vs Meiosis', type: 'video', duration: '16:30', uploadDate: '2025-11-02' },
                { id: 18, name: 'Interactive Cell Diagram', type: 'link', url: 'https://cellsalive.com', uploadDate: '2025-10-30' },
            ]
        },
    ];

    const getResourceIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <File className="text-red-500" size={24} />;
            case 'video': return <Video className="text-blue-500" size={24} />;
            case 'link': return <LinkIcon className="text-purple-500" size={24} />;
            default: return <File className="text-slate-500" size={24} />;
        }
    };

    const getResourceBadge = (type: string) => {
        switch (type) {
            case 'pdf': return 'bg-red-100 text-red-700';
            case 'video': return 'bg-blue-100 text-blue-700';
            case 'link': return 'bg-purple-100 text-purple-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-7xl mx-auto">
            {selectedCourse ? (
                // Course Detail View
                <div className="animate-fadeIn space-y-6">
                    {/* Header Controls */}
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            onClick={() => setSelectedCourse(null)}
                            className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95"
                        >
                            <ChevronRight size={20} className="rotate-180" />
                        </button>
                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Back to Dashboard</span>
                    </div>

                    {/* Hero Card */}
                    <div className={`relative overflow-hidden bg-gradient-to-r ${selectedCourse.color} rounded-[2rem] shadow-2xl p-8 lg:p-12 text-white`}>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                            <div>
                                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl mb-6 shadow-inner ring-1 ring-white/30">
                                    {selectedCourse.icon}
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black mb-2 tracking-tight">{selectedCourse.title}</h1>
                                <p className="text-xl opacity-90 font-bold mb-4">{selectedCourse.subtitle}</p>
                                <div className="flex items-center gap-2 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
                                    <User size={16} />
                                    <span className="text-sm font-black">{selectedCourse.teacher}</span>
                                </div>
                            </div>

                            <div className="hidden lg:grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                                    <p className="text-3xl font-black mb-1">{selectedCourse.materials.length}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Resources</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                                    <p className="text-3xl font-black mb-1">92%</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Attendance</p>
                                </div>
                            </div>
                        </div>

                        {/* Background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl" />
                    </div>

                    {/* Materials Section */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Study Materials</h3>
                                <p className="text-sm text-slate-500 font-medium">Curated resources for your success</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Recently Updated</span>
                            </div>
                        </div>

                        <div className="p-8">
                            {selectedCourse.materials.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {selectedCourse.materials.map((material: any) => (
                                        <div key={material.id} className="group relative bg-slate-50/50 border-2 border-slate-100 rounded-3xl p-6 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all duration-300">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0 border border-slate-100">
                                                    {getResourceIcon(material.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-lg font-black text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">{material.name}</h4>
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getResourceBadge(material.type)}`}>
                                                            {material.type}
                                                        </span>
                                                        {material.size && (
                                                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                                {material.size}
                                                            </span>
                                                        )}
                                                        {material.duration && (
                                                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                                {material.duration}
                                                            </span>
                                                        )}
                                                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                            Added {formatDate(material.uploadDate)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 mt-4 sm:mt-0 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                                                        <Eye size={16} />
                                                        View
                                                    </button>
                                                    {material.type !== 'link' && (
                                                        <button className="flex items-center justify-center p-3 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95">
                                                            <Download size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-100">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                        <BookOpen className="text-slate-200" size={40} />
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-400 tracking-tight">Empty Syllabus</h4>
                                    <p className="text-slate-500 font-bold mt-2">No learning materials have been uploaded for this course yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // Courses Grid View
                <div className="animate-fadeIn space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Courses</h2>
                            <p className="text-slate-500 font-bold mt-1">You're enrolled in {courses.length} educational tracks this semester</p>
                        </div>
                        <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest leading-none">Spring Session 2025</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <button
                                key={course.id}
                                onClick={() => setSelectedCourse(course)}
                                className="group relative text-left"
                            >
                                <div className="absolute inset-0 bg-blue-600/20 translate-y-4 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative bg-white rounded-[2.5rem] shadow-xl border border-slate-100 hover:border-indigo-400 transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:-translate-y-2">
                                    {/* Course Header with Gradient */}
                                    <div className={`bg-gradient-to-br ${course.color} p-8 text-white relative overflow-hidden`}>
                                        <div className="relative z-10">
                                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mb-6 shadow-inner ring-1 ring-white/30">
                                                {course.icon}
                                            </div>
                                            <h3 className="text-2xl font-black mb-1 group-hover:scale-105 transition-transform duration-300 origin-left tracking-tight">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{course.subtitle}</p>
                                        </div>
                                        {/* Abstract background art */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                                    </div>

                                    {/* Course Footer */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                                <User size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 leading-none">Instructor</p>
                                                <p className="text-sm font-black text-slate-800 truncate">{course.teacher}</p>
                                            </div>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                                    <BookOpen size={16} className="text-indigo-600" />
                                                </div>
                                                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                                                    {course.materials.length} Resources
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                                                <ChevronRight size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
