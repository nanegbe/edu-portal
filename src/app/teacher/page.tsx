'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Users, Award, ChevronRight, Calendar, TrendingUp, Star, FileText, ClipboardList } from 'lucide-react';

interface Score {
    assessment: string;
    type: 'quiz' | 'exam';
    score: number;
    date: string;
}

interface AttendanceRecord {
    date: string;
    status: string;
    participation: number;
}

interface Student {
    id: string;
    name: string;
    class: string;
    attendance: number;
    participation: number;
    avgScore: number;
    attendanceHistory: AttendanceRecord[];
    scores: Score[];
}

interface TeacherStats {
    totalStudents: number;
    avgAttendance: number;
    participationRate: number;
    avgScores: number;
    activeSemester: string;
}

interface TeacherInfo {
    name: string;
    email: string;
    subject: string;
    classes: string[];
}

interface DashboardData {
    teacher: TeacherInfo;
    stats: TeacherStats;
    students: Student[];
}

export default function TeacherDashboard() {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setIsLoading(true);
                const response = await fetch('/api/teacher/stats');
                if (!response.ok) throw new Error('Failed to fetch dashboard data');
                const data = await response.json();
                setDashboardData(data);
            } catch (err: any) {
                setError(err.message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDashboardData();
    }, []);

    const handleStudentClick = (student: Student) => {
        setSelectedStudent(student);
    };

    const handleBackToStudents = () => {
        setSelectedStudent(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-bold animate-pulse">Loading Dashboard Data...</p>
                </div>
            </div>
        );
    }

    if (error || !dashboardData) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-red-50 p-8 rounded-[2rem] border-2 border-red-100 text-center max-w-md">
                    <h3 className="text-xl font-black text-red-900 mb-2">Sync Error</h3>
                    <p className="text-red-600 font-medium mb-6">{error || 'Data could not be synchronized'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95"
                    >
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    const { teacher, stats, students } = dashboardData;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getAttendanceColor = (status: string) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-700 ring-green-200';
            case 'absent': return 'bg-red-100 text-red-700 ring-red-200';
            case 'late': return 'bg-yellow-100 text-yellow-700 ring-yellow-200';
            default: return 'bg-slate-100 text-slate-700 ring-slate-200';
        }
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40 hidden lg:block">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                        {selectedStudent ? (
                            <div className="flex items-center gap-2">
                                <button onClick={handleBackToStudents} className="text-slate-600 hover:text-slate-900 transition-colors">
                                    <ChevronRight size={20} className="rotate-180" />
                                </button>
                                <h2 className="text-xl font-bold text-slate-900">Student Profile: {selectedStudent.name}</h2>
                            </div>
                        ) : (
                            <h2 className="text-xl font-bold text-slate-900">My Dashboard Overview</h2>
                        )}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="p-6">
                {selectedStudent ? (
                    // Individual Student Performance View
                    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
                        {/* Student Header Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 pointer-events-none"></div>
                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl ring-4 ring-white">
                                        {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 leading-tight">{selectedStudent.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold ring-1 ring-blue-100 tracking-wide uppercase">{selectedStudent.class}</span>
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold ring-1 ring-indigo-100 tracking-wide uppercase">Top Performer</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleBackToStudents} className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95 lg:hidden">
                                    Back
                                </button>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-3 text-green-700">
                                        <span className="text-xs font-black uppercase tracking-widest">Attendance</span>
                                        <TrendingUp size={18} />
                                    </div>
                                    <p className="text-4xl font-black text-green-900 leading-none">{selectedStudent.attendance}%</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-3 text-blue-700">
                                        <span className="text-xs font-black uppercase tracking-widest">Participation</span>
                                        <Users size={18} />
                                    </div>
                                    <p className="text-4xl font-black text-blue-900 leading-none">{selectedStudent.participation}%</p>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-3 text-indigo-700">
                                        <span className="text-xs font-black uppercase tracking-widest">Avg Score</span>
                                        <Award size={18} />
                                    </div>
                                    <p className="text-4xl font-black text-indigo-900 leading-none">{selectedStudent.avgScore}%</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Assessments */}
                        <div className="bg-white rounded-[1rem] shadow-xl border border-blue-50 overflow-hidden">
                            <div className="px-8 py-6 border-b border-blue-50 bg-gradient-to-r from-blue-50/30 to-white">
                                <h3 className="text-xl font-black text-slate-900">Recent Assessments</h3>
                                <p className="text-sm text-slate-500 font-medium">Detailed breakdown of quiz and exam results</p>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedStudent.scores.map((score: Score, index: number) => (
                                        <div key={index} className="group relative bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] p-6 hover:border-blue-200 hover:bg-white transition-all hover:shadow-lg">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ring-1 ${score.type === 'quiz' ? 'bg-blue-100 text-blue-700 ring-blue-200' : 'bg-indigo-100 text-indigo-700 ring-indigo-200'}`}>
                                                    {score.type}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">{formatDate(score.date)}</span>
                                            </div>
                                            <h4 className="font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{score.assessment}</h4>
                                            <div className="flex items-baseline gap-1 mb-4">
                                                <span className="text-4xl font-black text-slate-900">{score.score}</span>
                                                <span className="text-lg font-bold text-slate-400">/100</span>
                                            </div>
                                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-700 ease-out group-hover:opacity-90 ${score.score >= 90 ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : score.score >= 80 ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gradient-to-r from-orange-400 to-red-500'}`}
                                                    style={{ width: `${score.score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Attendance History */}
                        <div className="bg-white rounded-[1rem] shadow-xl border border-blue-50 overflow-hidden">
                            <div className="px-8 py-6 border-b border-blue-50 bg-gradient-to-r from-indigo-50/30 to-white">
                                <h3 className="text-xl font-black text-slate-900">Weekly Performance Tracker</h3>
                                <p className="text-sm text-slate-500 font-medium">Daily participation and status breakdown</p>
                            </div>
                            <div className="p-8">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-slate-50">
                                                <th className="text-left py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest">Session Date</th>
                                                <th className="text-center py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                                <th className="text-center py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest">Engagement</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedStudent.attendanceHistory.map((record: AttendanceRecord, index: number) => (
                                                <tr key={index} className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors group">
                                                    <td className="py-5 px-6 font-bold text-slate-700">{formatDate(record.date)}</td>
                                                    <td className="py-5 px-6 text-center">
                                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ring-1 ring-inset ${getAttendanceColor(record.status)}`}>
                                                            {record.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-5 px-6 text-center">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star
                                                                    key={star}
                                                                    size={16}
                                                                    className={`${star <= record.participation ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'} transition-transform group-hover:scale-110`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Main Dashboard View
                    <div className="space-y-6 animate-fadeIn">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Students', val: stats.totalStudents.toLocaleString(), icon: Users, from: 'from-blue-400', to: 'to-blue-600', trend: null },
                                { label: 'Avg Attendance', val: `${stats.avgAttendance}%`, icon: Calendar, from: 'from-green-400', to: 'to-emerald-600', trend: '+2.1%' },
                                { label: 'Participation', val: `${stats.participationRate}%`, icon: TrendingUp, from: 'from-cyan-400', to: 'to-blue-600', trend: '+1.5%' },
                                { label: 'Avg Scores', val: `${stats.avgScores}%`, icon: BookOpen, from: 'from-purple-400', to: 'to-indigo-600', trend: '+0.8%' }

                            ].map((stat, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.from} ${stat.to} flex items-center justify-center`}>
                                            <stat.icon className="text-white" size={24} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">{stat.label}</span>
                                    </div>
                                    <p className="text-3xl font-bold text-slate-900">{stat.val}</p>
                                    {stat.trend ? (
                                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                            <TrendingUp size={12} />
                                            {stat.trend} from last month
                                        </p>
                                    ) : (
                                        <p className="text-xs text-slate-500 mt-2">Active Semester</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Student Success Hub */}
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="px-10 py-8 border-b-2 border-slate-50 bg-gradient-to-r from-blue-50/20 to-white flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Student Success Hub</h3>
                                    <p className="text-slate-500 font-bold text-sm">Top performing students across your classes</p>
                                </div>
                                <span className="hidden sm:block text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 uppercase tracking-widest">
                                    {stats.activeSemester}
                                </span>
                            </div>
                            <div className="overflow-x-auto min-h-[400px]">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-slate-50 bg-slate-50/30">
                                            <th className="text-left py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                                            <th className="text-left py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                                            <th className="text-left py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</th>
                                            <th className="text-center py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance</th>
                                            <th className="text-center py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Engagement</th>
                                            <th className="text-right py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Score</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {students.map((student: Student, index: number) => (
                                            <tr
                                                key={student.id}
                                                onClick={() => handleStudentClick(student)}
                                                className="hover:bg-blue-50/30 cursor-pointer transition-all duration-300 group"
                                            >
                                                <td className="py-6 px-10">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-md transition-transform group-hover:scale-110 ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' : index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' : index === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' : 'bg-white border-2 border-slate-100 text-slate-400'}`}>
                                                        {index + 1}
                                                    </div>
                                                </td>
                                                <td className="py-6 px-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-lg ring-4 ring-white">
                                                            {student.name.split(' ').map((n: string) => n[0]).join('')}
                                                        </div>
                                                        <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{student.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-6">
                                                    <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-lg border border-slate-200 uppercase tracking-widest">{student.class}</span>
                                                </td>
                                                <td className="py-6 px-6 text-center">
                                                    <p className="text-lg font-black text-green-600 leading-none">{student.attendance}%</p>
                                                    {/* <div className="w-20 h-1 bg-slate-100 rounded-full mt-2 mx-auto overflow-hidden"> */}
                                                    {/* <div className="h-full bg-green-500 rounded-full" style={{ width: `${student.attendance}%` }}></div> */}
                                                    {/* </div> */}
                                                </td>
                                                <td className="py-6 px-6 text-center">
                                                    <p className="text-lg font-black text-blue-600 leading-none">{student.participation}%</p>
                                                    {/* <div className="w-20 h-1 bg-slate-100 rounded-full mt-2 mx-auto overflow-hidden"> */}
                                                    {/* <div className="h-full bg-blue-500 rounded-full" style={{ width: `${student.participation}%` }}></div> */}
                                                    {/* </div> */}
                                                </td>
                                                <td className="py-6 px-10 text-right">
                                                    <div className="inline-flex flex-col items-end">
                                                        <span className="text-2xl font-black text-indigo-700 leading-none">{student.avgScore}%</span>
                                                        <span className="text-[10px] font-black text-slate-300 uppercase mt-1">Weighted Avg</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </>
    );
}
