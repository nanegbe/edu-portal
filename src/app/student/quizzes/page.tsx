'use client';

import { useState } from 'react';
import { ClipboardCheck, Award, TrendingUp, Calendar, User, Search } from 'lucide-react';

export default function StudentQuizzes() {
    const [filterCourse, setFilterCourse] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const quizzes = [
        {
            id: 1,
            course: 'Mathematics',
            courseColor: 'from-blue-400 to-cyan-500',
            assessmentName: 'Quiz 1: Linear Equations',
            type: 'quiz',
            score: 95,
            maxScore: 100,
            date: '2025-10-15',
            teacher: 'Sarah Johnson'
        },
        {
            id: 2,
            course: 'Mathematics',
            courseColor: 'from-blue-400 to-cyan-500',
            assessmentName: 'Midterm Exam',
            type: 'exam',
            score: 88,
            maxScore: 100,
            date: '2025-10-30',
            teacher: 'Sarah Johnson'
        },
        {
            id: 3,
            course: 'Mathematics',
            courseColor: 'from-blue-400 to-cyan-500',
            assessmentName: 'Quiz 2: Quadratic Functions',
            type: 'quiz',
            score: 92,
            maxScore: 100,
            date: '2025-11-05',
            teacher: 'Sarah Johnson'
        },
        {
            id: 4,
            course: 'Physics',
            courseColor: 'from-purple-400 to-pink-500',
            assessmentName: 'Quiz 1: Newton\'s Laws',
            type: 'quiz',
            score: 87,
            maxScore: 100,
            date: '2025-10-20',
            teacher: 'Michael Chen'
        },
        {
            id: 5,
            course: 'Physics',
            courseColor: 'from-purple-400 to-pink-500',
            assessmentName: 'Lab Practical Exam',
            type: 'exam',
            score: 90,
            maxScore: 100,
            date: '2025-11-01',
            teacher: 'Michael Chen'
        },
        {
            id: 6,
            course: 'English Literature',
            courseColor: 'from-green-400 to-emerald-500',
            assessmentName: 'Character Analysis Quiz',
            type: 'quiz',
            score: 94,
            maxScore: 100,
            date: '2025-10-18',
            teacher: 'Emily Rodriguez'
        },
        {
            id: 7,
            course: 'English Literature',
            courseColor: 'from-green-400 to-emerald-500',
            assessmentName: 'Essay Exam',
            type: 'exam',
            score: 91,
            maxScore: 100,
            date: '2025-11-03',
            teacher: 'Emily Rodriguez'
        },
        {
            id: 8,
            course: 'Chemistry',
            courseColor: 'from-orange-400 to-red-500',
            assessmentName: 'Periodic Table Quiz',
            type: 'quiz',
            score: 85,
            maxScore: 100,
            date: '2025-10-22',
            teacher: 'David Thompson'
        },
        {
            id: 9,
            course: 'History',
            courseColor: 'from-amber-400 to-yellow-500',
            assessmentName: 'World War II Quiz',
            type: 'quiz',
            score: 89,
            maxScore: 100,
            date: '2025-10-25',
            teacher: 'Lisa Anderson'
        },
        {
            id: 10,
            course: 'Biology',
            courseColor: 'from-teal-400 to-cyan-500',
            assessmentName: 'Cell Structure Quiz',
            type: 'quiz',
            score: 93,
            maxScore: 100,
            date: '2025-11-04',
            teacher: 'Robert Williams'
        },
    ];

    const courses = Array.from(new Set(quizzes.map(q => q.course)));

    const filteredQuizzes = quizzes.filter(q => {
        const matchesCourse = filterCourse === 'all' || q.course === filterCourse;
        const matchesSearch = q.assessmentName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCourse && matchesSearch;
    });

    const getScoreColor = (percentage: number) => {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 80) return 'text-blue-600';
        if (percentage >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBadgeColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-green-50 text-green-700 border-green-200';
        if (percentage >= 80) return 'bg-blue-50 text-blue-700 border-blue-200';
        if (percentage >= 70) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        return 'bg-red-50 text-red-700 border-red-200';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Calculate stats
    const stats = {
        totalAssessments: filteredQuizzes.length,
        averageScore: filteredQuizzes.length > 0
            ? (filteredQuizzes.reduce((sum, q) => sum + (q.score / q.maxScore * 100), 0) / filteredQuizzes.length).toFixed(1)
            : '0',
        quizzes: filteredQuizzes.filter(q => q.type === 'quiz').length,
        exams: filteredQuizzes.filter(q => q.type === 'exam').length
    };

    // Group by course for summary
    const courseSummaries = courses.map(course => {
        const courseQuizzes = quizzes.filter(q => q.course === course);
        const avgScore = courseQuizzes.length > 0
            ? (courseQuizzes.reduce((sum, q) => sum + (q.score / q.maxScore * 100), 0) / courseQuizzes.length).toFixed(1)
            : '0';
        const courseInfo = quizzes.find(q => q.course === course);
        return {
            course,
            courseColor: courseInfo?.courseColor || 'from-slate-400 to-slate-500',
            count: courseQuizzes.length,
            avgScore
        };
    });

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
                <div className="w-full lg:flex-1 group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Global Database Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-500">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by assessment name..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all group-hover:shadow-md"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-72">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Curriculum Thread</label>
                    <select
                        value={filterCourse}
                        onChange={(e) => setFilterCourse(e.target.value)}
                        className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat"
                    >
                        <option value="all">All Disciplines</option>
                        {courses.map((course) => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats Cluster */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Assessments', val: stats.totalAssessments, icon: ClipboardCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Academic Standing', val: `${stats.averageScore}%`, icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Active Quizzes', val: stats.quizzes, icon: ClipboardCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Mastery Exams', val: stats.exams, icon: Award, color: 'text-orange-600', bg: 'bg-orange-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-[2rem] shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color} leading-none tracking-tight`}>{stat.val}</p>
                        {stat.label === 'Academic Standing' && (
                            <div className="flex items-center gap-1.5 mt-2 text-green-600 font-bold text-[10px] uppercase tracking-wider">
                                <TrendingUp size={12} />
                                Standing: Superior
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Course Mastery Summary */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Competency Matrix</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">Real-time performance distribution across courses</p>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courseSummaries.map((summary) => (
                            <div key={summary.course} className="group relative bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 hover:border-indigo-200 hover:bg-white transition-all shadow-sm hover:shadow-lg">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${summary.courseColor} mb-5 flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                                    {summary.course[0]}
                                </div>
                                <h4 className="text-lg font-black text-slate-900 mb-1 tracking-tight">{summary.course}</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{summary.count} data points recorded</p>

                                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-600">Weighted Avg</span>
                                    <span className={`text-2xl font-black ${getScoreColor(parseFloat(summary.avgScore))}`}>
                                        {summary.avgScore}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Ledger */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-indigo-50 overflow-hidden">
                <div className="px-10 py-8 border-b-2 border-slate-50 bg-gradient-to-r from-indigo-50/20 to-white flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Ledger</h3>
                        <p className="text-sm text-slate-500 font-bold mt-1">A comprehensive record of all formal assessments</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100">
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{filteredQuizzes.length} Entries Found</span>
                    </div>
                </div>

                <div className="p-10">
                    <div className="space-y-6">
                        {filteredQuizzes.map((quiz) => {
                            const percentage = (quiz.score / quiz.maxScore * 100).toFixed(1);
                            return (
                                <div key={quiz.id} className="group relative bg-slate-50/50 border-2 border-slate-100 rounded-[2.5rem] p-8 hover:border-indigo-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className="flex flex-col xl:flex-row xl:items-center gap-10">
                                        {/* Course Signature */}
                                        <div className="flex items-center gap-6 xl:flex-1">
                                            <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${quiz.courseColor} flex items-center justify-center text-white font-black text-3xl shadow-xl ring-4 ring-white group-hover:rotate-6 transition-transform flex-shrink-0`}>
                                                {quiz.course[0]}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-xl font-black text-slate-900 mb-2 truncate tracking-tight">{quiz.assessmentName}</h4>
                                                <div className="flex items-center gap-4 flex-wrap">
                                                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{quiz.course}</span>
                                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ring-1 ${quiz.type === 'quiz' ? 'bg-blue-100 text-blue-700 ring-blue-200' : 'bg-orange-100 text-orange-700 ring-orange-200'}`}>
                                                        {quiz.type === 'quiz' ? 'Micro-Quiz' : 'Formal Exam'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Metadata Hub */}
                                        <div className="grid grid-cols-2 gap-8 py-6 xl:py-0 xl:px-10 xl:border-x border-slate-200">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors border border-slate-100">
                                                    <Calendar size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Submission</p>
                                                    <p className="text-xs font-black text-slate-700">{formatDate(quiz.date)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors border border-slate-100">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Assessed By</p>
                                                    <p className="text-xs font-black text-slate-700 truncate max-w-[120px]">{quiz.teacher}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Final Grade */}
                                        <div className="flex items-center justify-between xl:justify-end xl:w-64 gap-8">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score Matrix</p>
                                                <p className={`text-4xl font-black ${getScoreColor(parseFloat(percentage))} tracking-tighter`}>
                                                    {quiz.score}<span className="text-slate-300 mx-1.5">/</span>{quiz.maxScore}
                                                </p>
                                            </div>
                                            <div className={`w-24 h-24 rounded-3xl border-4 flex flex-col items-center justify-center transition-all group-hover:scale-105 shadow-inner ${getScoreBadgeColor(parseFloat(percentage))}`}>
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Result</span>
                                                <span className="text-xl font-black">{percentage}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredQuizzes.length === 0 && (
                            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-1 ring-slate-200">
                                    <ClipboardCheck className="text-slate-200" size={48} />
                                </div>
                                <h4 className="text-3xl font-black text-slate-400 tracking-tight italic">No Records Found</h4>
                                <p className="text-slate-500 font-bold mt-2">Adjust your filters to locate required assessment data.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
