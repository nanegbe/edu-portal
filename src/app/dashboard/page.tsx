'use client';

import { useState } from 'react';
import { ChevronRight, TrendingUp, Users, BookOpen, Award, Calendar } from 'lucide-react';

export default function PrincipalDashboard() {
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    // Mock data
    const schoolStats = {
        totalStudents: 1247,
        attendanceRate: 94.2,
        participationRate: 87.5,
        academicAverage: 82.3
    };

    const classes = [
        { id: 1, name: 'Grade 10A', attendance: 96.5, participation: 91.2, academicAvg: 85.7, students: 32 },
        { id: 2, name: 'Grade 10B', attendance: 94.8, participation: 88.5, academicAvg: 83.4, students: 30 },
        { id: 3, name: 'Grade 9A', attendance: 93.2, participation: 86.7, academicAvg: 81.2, students: 28 },
        { id: 4, name: 'Grade 9B', attendance: 91.5, participation: 84.3, academicAvg: 79.8, students: 29 },
        { id: 5, name: 'Grade 11A', attendance: 95.8, participation: 90.1, academicAvg: 86.5, students: 31 },
        { id: 6, name: 'Grade 11B', attendance: 92.3, participation: 85.8, academicAvg: 80.9, students: 27 },
        { id: 7, name: 'Grade 12A', attendance: 97.2, participation: 93.5, academicAvg: 88.2, students: 25 },
        { id: 8, name: 'Grade 12B', attendance: 94.1, participation: 89.3, academicAvg: 84.6, students: 26 },
    ];

    const mockStudents = [
        { id: 1, name: 'Emma Johnson', attendance: 98.5, participation: 95.0, academicAvg: 92.3 },
        { id: 2, name: 'Liam Chen', attendance: 96.2, participation: 91.5, academicAvg: 89.7 },
        { id: 3, name: 'Sophia Martinez', attendance: 94.8, participation: 88.3, academicAvg: 87.2 },
        { id: 4, name: 'Noah Williams', attendance: 92.5, participation: 85.7, academicAvg: 84.5 },
        { id: 5, name: 'Olivia Brown', attendance: 91.3, participation: 83.2, academicAvg: 82.8 },
    ];

    const handleClassClick = (classData: any) => {
        setSelectedClass(classData);
        setSelectedStudent(null);
    };

    const handleStudentClick = (student: any) => {
        setSelectedStudent(student);
    };

    const handleBackToClasses = () => {
        setSelectedClass(null);
        setSelectedStudent(null);
    };

    const handleBackToStudents = () => {
        setSelectedStudent(null);
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40 hidden lg:block">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                        {selectedStudent ? (
                            <div className="flex items-center gap-2">
                                <button onClick={handleBackToStudents} className="text-slate-600 hover:text-slate-900">
                                    <ChevronRight size={20} className="rotate-180" />
                                </button>
                                <h2 className="text-xl font-bold text-slate-900">{selectedStudent.name}</h2>
                            </div>
                        ) : selectedClass ? (
                            <div className="flex items-center gap-2">
                                <button onClick={handleBackToClasses} className="text-slate-600 hover:text-slate-900">
                                    <ChevronRight size={20} className="rotate-180" />
                                </button>
                                <h2 className="text-xl font-bold text-slate-900">{selectedClass.name}</h2>
                            </div>
                        ) : (
                            <h2 className="text-xl font-bold text-slate-900">School Overview</h2>
                        )}
                    </div>
                    <div className="text-sm text-slate-600">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="p-6">
                {selectedStudent ? (
                    // Individual Student View
                    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">{selectedStudent.name}</h3>
                                    <p className="text-slate-600 mt-1">{selectedClass.name}</p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                                    {selectedStudent.name.split(' ').map((n: any) => n[0]).join('')}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                                    <div className="flex items-center gap-2 text-green-700 mb-2">
                                        <Award size={18} />
                                        <span className="text-sm font-medium uppercase tracking-wide">Attendance</span>
                                    </div>
                                    <p className="text-3xl font-bold text-green-900">{selectedStudent.attendance}%</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                                        <Users size={18} />
                                        <span className="text-sm font-medium uppercase tracking-wide">Participation</span>
                                    </div>
                                    <p className="text-3xl font-bold text-blue-900">{selectedStudent.participation}%</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200">
                                    <div className="flex items-center gap-2 text-purple-700 mb-2">
                                        <BookOpen size={18} />
                                        <span className="text-sm font-medium uppercase tracking-wide">Academic Avg</span>
                                    </div>
                                    <p className="text-3xl font-bold text-purple-900">{selectedStudent.academicAvg}%</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <h4 className="font-semibold text-slate-900 mb-4">Performance Breakdown</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-600">Attendance Rate</span>
                                            <span className="font-medium text-slate-900">{selectedStudent.attendance}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all" style={{ width: `${selectedStudent.attendance}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-600">Participation Rate</span>
                                            <span className="font-medium text-slate-900">{selectedStudent.participation}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all" style={{ width: `${selectedStudent.participation}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-600">Academic Average</span>
                                            <span className="font-medium text-slate-900">{selectedStudent.academicAvg}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full transition-all" style={{ width: `${selectedStudent.academicAvg}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : selectedClass ? (
                    // Class Dashboard View
                    <div className="space-y-6 animate-fadeIn">
                        {/* Class Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                        <Users className="text-white" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Students</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{selectedClass.students}</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                                        <Award className="text-white" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Attendance</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{selectedClass.attendance}%</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                                        <TrendingUp className="text-white" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Participation</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{selectedClass.participation}%</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
                                        <BookOpen className="text-white" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Academic Avg</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{selectedClass.academicAvg}%</p>
                            </div>
                        </div>

                        {/* Student Leaderboard */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
                            <div className="px-6 py-5 border-b border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900">Student Leaderboard</h3>
                                <p className="text-sm text-slate-600 mt-1">Top performing students in {selectedClass.name}</p>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-200">
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Rank</th>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Student</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Attendance</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Participation</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Academic Avg</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockStudents.map((student, index) => (
                                                <tr
                                                    key={student.id}
                                                    onClick={() => handleStudentClick(student)}
                                                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group"
                                                >
                                                    <td className="py-4 px-4">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' : index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' : index === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                            {index + 1}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                                                                {student.name.split(' ').map((n: any) => n[0]).join('')}
                                                            </div>
                                                            <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{student.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-700">
                                                            {student.attendance}%
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                                                            {student.participation}%
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700">
                                                            {student.academicAvg}%
                                                        </span>
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
                        {/* School-wide Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                        <Users className="text-white" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Students</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{schoolStats.totalStudents.toLocaleString()}</p>
                                <p className="text-xs text-slate-500 mt-2">Across all grades</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                                        <Calendar className="text-white" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Attendance Rate</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{schoolStats.attendanceRate}%</p>
                                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    +2.3% from last month
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                                        <TrendingUp className="text-white" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Participation</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{schoolStats.participationRate}%</p>
                                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    +1.8% from last month
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
                                        <BookOpen className="text-white" size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Academic Avg</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{schoolStats.academicAverage}%</p>
                                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    +0.9% from last month
                                </p>
                            </div>
                        </div>

                        {/* Class Leaderboard */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
                            <div className="px-6 py-5 border-b border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900">Class / Grade Leaderboard</h3>
                                <p className="text-sm text-slate-600 mt-1">Ranked by overall performance</p>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-200">
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Rank</th>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Class</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Students</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Attendance</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Participation</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Academic Avg</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classes.map((classItem, index) => (
                                                <tr
                                                    key={classItem.id}
                                                    onClick={() => handleClassClick(classItem)}
                                                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group"
                                                >
                                                    <td className="py-4 px-4">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' : index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' : index === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                            {index + 1}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{classItem.name}</span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className="text-sm text-slate-600">{classItem.students}</span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-700">
                                                            {classItem.attendance}%
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                                                            {classItem.participation}%
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700">
                                                            {classItem.academicAvg}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
