'use client';

import { useState } from 'react';
import { FileText, Award, Save, Plus, Edit, Trash2, Search, Filter, Calendar as CalendarIcon, ClipboardList, BookOpen } from 'lucide-react';

export default function TeacherScores() {
    const [selectedCourse, setSelectedCourse] = useState('Algebra II');
    const [showAddScoreModal, setShowAddScoreModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');

    const teacherInfo = {
        name: 'Sarah Johnson',
        email: 'sarah.j@school.edu',
        subject: 'Mathematics',
        courses: ['Algebra II', 'Calculus', 'Geometry']
    };

    const students = [
        { id: 1, name: 'Emma Johnson', class: 'Grade 10A' },
        { id: 2, name: 'Liam Chen', class: 'Grade 10A' },
        { id: 3, name: 'Noah Williams', class: 'Grade 10A' },
        { id: 4, name: 'Sophia Martinez', class: 'Grade 11A' },
        { id: 5, name: 'Olivia Brown', class: 'Grade 11A' },
    ];

    const [scores, setScores] = useState([
        {
            id: 1,
            studentId: 1,
            studentName: 'Emma Johnson',
            course: 'Algebra II',
            assessmentName: 'Quiz 1',
            assessmentType: 'quiz',
            score: 95,
            maxScore: 100,
            date: '2025-10-15'
        },
        {
            id: 2,
            studentId: 1,
            studentName: 'Emma Johnson',
            course: 'Algebra II',
            assessmentName: 'Midterm Exam',
            assessmentType: 'exam',
            score: 88,
            maxScore: 100,
            date: '2025-10-30'
        },
        {
            id: 3,
            studentId: 2,
            studentName: 'Liam Chen',
            course: 'Algebra II',
            assessmentName: 'Quiz 1',
            assessmentType: 'quiz',
            score: 90,
            maxScore: 100,
            date: '2025-10-15'
        },
        {
            id: 4,
            studentId: 2,
            studentName: 'Liam Chen',
            course: 'Algebra II',
            assessmentName: 'Midterm Exam',
            assessmentType: 'exam',
            score: 92,
            maxScore: 100,
            date: '2025-10-30'
        },
        {
            id: 5,
            studentId: 4,
            studentName: 'Sophia Martinez',
            course: 'Calculus',
            assessmentName: 'Derivatives Quiz',
            assessmentType: 'quiz',
            score: 87,
            maxScore: 100,
            date: '2025-11-02'
        },
    ]);

    const [newScore, setNewScore] = useState<any>({
        studentId: '',
        course: 'Algebra II',
        assessmentName: '',
        assessmentType: 'quiz',
        score: '',
        maxScore: 100,
        date: new Date().toISOString().split('T')[0]
    });

    const handleAddScore = () => {
        if (newScore.studentId && newScore.assessmentName && newScore.score) {
            const student = students.find(s => s.id === parseInt(newScore.studentId));
            if (!student) return;

            const scoreEntry = {
                id: scores.length + 1,
                studentId: parseInt(newScore.studentId),
                studentName: student.name,
                course: newScore.course,
                assessmentName: newScore.assessmentName,
                assessmentType: newScore.assessmentType,
                score: parseFloat(newScore.score),
                maxScore: parseFloat(newScore.maxScore),
                date: newScore.date
            };
            setScores([...scores, scoreEntry]);
            setNewScore({
                studentId: '',
                course: 'Algebra II',
                assessmentName: '',
                assessmentType: 'quiz',
                score: '',
                maxScore: 100,
                date: new Date().toISOString().split('T')[0]
            });
            setShowAddScoreModal(false);
        }
    };

    const handleDeleteScore = (id: number) => {
        if (confirm('Are you sure you want to delete this score?')) {
            setScores(scores.filter(s => s.id !== id));
        }
    };

    const filteredScores = scores.filter(score => {
        const matchesCourse = score.course === selectedCourse;
        const matchesSearch = score.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            score.assessmentName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || score.assessmentType === filterType;
        return matchesCourse && matchesSearch && matchesFilter;
    });

    const getScoreColor = (percentage: number) => {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 80) return 'text-blue-600';
        if (percentage >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBadgeColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-green-100 text-green-700 border-green-200';
        if (percentage >= 80) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (percentage >= 70) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        return 'bg-red-100 text-red-700 border-red-200';
    };

    const stats = {
        total: filteredScores.length,
        avgScore: filteredScores.length > 0
            ? (filteredScores.reduce((sum, s) => sum + (s.score / s.maxScore * 100), 0) / filteredScores.length).toFixed(1)
            : '0',
        quizzes: filteredScores.filter(s => s.assessmentType === 'quiz').length,
        exams: filteredScores.filter(s => s.assessmentType === 'exam').length
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">Student Academic Performance</h2>
                        <p className="text-sm text-slate-600 font-medium">Capture and track assessment vectors</p>
                    </div>
                    <button
                        onClick={() => setShowAddScoreModal(true)}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <Plus size={20} />
                        <span>New Assessment Entry</span>
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="p-6">
                {/* Analytics Header */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Assessments', val: stats.total, icon: Award, from: 'from-blue-400', to: 'to-blue-600' },
                        { label: 'Weighted Average', val: `${stats.avgScore}%`, icon: ClipboardList, from: 'from-indigo-400', to: 'to-indigo-600' },
                        { label: 'Quizzes Completed', val: stats.quizzes, icon: FileText, from: 'from-green-400', to: 'to-emerald-600' },
                        { label: 'Exam High Scores', val: stats.exams, icon: BookOpen, from: 'from-orange-400', to: 'to-red-600' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.from} ${stat.to} flex items-center justify-center`}>
                                    <stat.icon className="text-white" size={24} />
                                </div>
                                <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">{stat.label}</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* Global Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="group bg-white rounded-3xl shadow-md p-6 border border-blue-50">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Active Course</label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all appearance-none"
                        >
                            {teacherInfo.courses.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>
                    <div className="group bg-white rounded-3xl shadow-md p-6 border border-blue-50">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Refine Search</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Student or assessment..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 font-bold text-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="group bg-white rounded-3xl shadow-md p-6 border border-blue-50">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Filter Stream</label>
                        <div className="flex gap-2">
                            {['all', 'quiz', 'exam'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filterType === type ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Master Score Ledger */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="px-10 py-8 border-b-2 border-slate-50 bg-gradient-to-r from-blue-50/20 via-white to-indigo-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Master Score Ledger</h3>
                            <p className="text-slate-500 font-bold text-sm">Detailed assessment analytics for <span className="text-blue-600 font-black">{selectedCourse}</span></p>
                        </div>
                    </div>
                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-50 bg-slate-50/30">
                                    <th className="text-left py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Identity</th>
                                    <th className="text-left py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assessment Name</th>
                                    <th className="text-center py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                    <th className="text-center py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Raw Data</th>
                                    <th className="text-right py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredScores.map((score) => {
                                    const percentage = (score.score / score.maxScore * 100);
                                    return (
                                        <tr key={score.id} className="hover:bg-blue-50/30 transition-all duration-300 group">
                                            <td className="py-6 px-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-md group-hover:scale-110 transition-transform">
                                                        {score.studentName.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{score.studentName}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6">
                                                <p className="font-bold text-slate-900 text-sm">{score.assessmentName}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Recorded: {new Date(score.date).toLocaleDateString()}</p>
                                            </td>
                                            <td className="py-6 px-6 text-center">
                                                <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ring-1 ring-inset ${score.assessmentType === 'quiz' ? 'bg-green-50 text-green-700 ring-green-100' : 'bg-orange-50 text-orange-700 ring-orange-100'}`}>
                                                    {score.assessmentType}
                                                </span>
                                            </td>
                                            <td className="py-6 px-6">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className={`text-2xl font-black ${getScoreColor(percentage)}`}>{score.score}</span>
                                                        <span className="text-xs font-bold text-slate-300">/ {score.maxScore}</span>
                                                    </div>
                                                    {/* <span className={`px-3 py-0.5 rounded-lg text-[10px] font-black border-2 ${getScoreBadgeColor(percentage)}`}>
                                                        {percentage.toFixed(1)}%
                                                    </span> */}
                                                </div>
                                            </td>
                                            <td className="py-6 px-10">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="p-3 text-blue-500 bg-white border border-slate-100 hover:border-blue-200 hover:bg-blue-50 rounded-2xl transition-all shadow-sm active:scale-95">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteScore(score.id)}
                                                        className="p-3 text-red-500 bg-white border border-slate-100 hover:border-red-200 hover:bg-red-50 rounded-2xl transition-all shadow-sm active:scale-95"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filteredScores.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-32 space-y-6">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border-4 border-dashed border-slate-100">
                                    <Award className="text-slate-200" size={40} />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xl font-black text-slate-400 uppercase tracking-widest">No Records Found</h4>
                                    <p className="text-slate-500 font-bold mt-2">Initialize your data stream by adding a new entry.</p>
                                </div>
                                <button
                                    onClick={() => setShowAddScoreModal(true)}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all hover:scale-105"
                                >
                                    Create Entry
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add Score Modal */}
            {showAddScoreModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full animate-fadeIn overflow-hidden">
                        <div className="p-10 border-b border-slate-50 bg-gradient-to-r from-blue-50/20 to-white">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Performance Intake</h3>
                            <p className="text-slate-500 font-bold mt-2">Record student assessment outcomes</p>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Target Student</label>
                                    <select
                                        value={newScore.studentId}
                                        onChange={(e) => setNewScore({ ...newScore, studentId: e.target.value })}
                                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all"
                                    >
                                        <option value="">Choose Student...</option>
                                        {students.map((student) => (
                                            <option key={student.id} value={student.id}>{student.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Active Course</label>
                                    <select
                                        value={newScore.course}
                                        onChange={(e) => setNewScore({ ...newScore, course: e.target.value })}
                                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none"
                                    >
                                        {teacherInfo.courses.map((course) => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Assessment Category</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setNewScore({ ...newScore, assessmentType: 'quiz' })}
                                        className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-4 ${newScore.assessmentType === 'quiz' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg scale-105' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-blue-200 hover:bg-white'}`}
                                    >
                                        Quiz
                                    </button>
                                    <button
                                        onClick={() => setNewScore({ ...newScore, assessmentType: 'exam' })}
                                        className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-4 ${newScore.assessmentType === 'exam' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg scale-105' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-blue-200 hover:bg-white'}`}
                                    >
                                        Exam
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Assessment Name</label>
                                <input
                                    type="text"
                                    value={newScore.assessmentName}
                                    onChange={(e) => setNewScore({ ...newScore, assessmentName: e.target.value })}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 shadow-inner outline-none"
                                    placeholder="e.g. Midterm Physics Exam"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Resulting Score</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max={newScore.maxScore}
                                        step="0.5"
                                        value={newScore.score}
                                        onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-center text-2xl text-blue-600 shadow-inner focus:ring-4 focus:ring-blue-500/10"
                                        placeholder="00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Total Possible</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={newScore.maxScore}
                                        onChange={(e) => setNewScore({ ...newScore, maxScore: e.target.value })}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-center text-2xl text-slate-400 shadow-inner"
                                        placeholder="100"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Assessment Timestamp</label>
                                <CalendarIcon className="absolute left-6 bottom-4 text-blue-400" size={20} />
                                <input
                                    type="date"
                                    value={newScore.date}
                                    onChange={(e) => setNewScore({ ...newScore, date: e.target.value })}
                                    max={new Date().toISOString().split('T')[0]}
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all group-hover:bg-white"
                                />
                            </div>
                        </div>
                        <div className="p-10 bg-slate-50 flex gap-4">
                            <button
                                onClick={() => {
                                    setShowAddScoreModal(false);
                                    setNewScore({
                                        studentId: '',
                                        course: 'Algebra II',
                                        assessmentName: '',
                                        assessmentType: 'quiz',
                                        score: '',
                                        maxScore: 100,
                                        date: new Date().toISOString().split('T')[0]
                                    });
                                }}
                                className="flex-1 px-4 py-5 border-2 border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-sm active:scale-95"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleAddScore}
                                className="flex-[2] px-4 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
                            >
                                Commit Record
                            </button>
                        </div>
                    </div>
                </div>
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
        </>
    );
}
