'use client';

import { useState } from 'react';
import { Users, Save, Plus, Calendar as CalendarIcon, Search } from 'lucide-react';

export default function TeacherAttendance() {
    const [selectedClass, setSelectedClass] = useState('Grade 10A');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const teacherInfo = {
        name: 'Sarah Johnson',
        email: 'sarah.j@school.edu',
        subject: 'Mathematics',
        classes: ['Grade 10A', 'Grade 11A']
    };

    const [students, setStudents] = useState([
        {
            id: 1,
            name: 'Emma Johnson',
            class: 'Grade 10A',
            attendance: 'present',
            participation: 5
        },
        {
            id: 2,
            name: 'Liam Chen',
            class: 'Grade 10A',
            attendance: 'present',
            participation: 4
        },
        {
            id: 3,
            name: 'Noah Williams',
            class: 'Grade 10A',
            attendance: 'absent',
            participation: 0
        },
        {
            id: 4,
            name: 'Sophia Martinez',
            class: 'Grade 11A',
            attendance: 'present',
            participation: 5
        },
        {
            id: 5,
            name: 'Olivia Brown',
            class: 'Grade 11A',
            attendance: 'late',
            participation: 3
        },
    ]);

    const [newStudent, setNewStudent] = useState({
        name: '',
        class: 'Grade 10A',
        course: 'Mathematics'
    });

    const handleAttendanceChange = (studentId: number, status: string) => {
        setStudents(students.map(s =>
            s.id === studentId ? { ...s, attendance: status, participation: status === 'absent' ? 0 : s.participation } : s
        ));
    };

    const handleParticipationChange = (studentId: number, rating: number) => {
        setStudents(students.map(s =>
            s.id === studentId ? { ...s, participation: rating } : s
        ));
    };

    const handleSaveAttendance = () => {
        alert(`Attendance saved for ${selectedClass} on ${selectedDate}`);
        console.log('Saving attendance:', { selectedClass, selectedDate, students: students.filter(s => s.class === selectedClass) });
    };

    const handleAddStudent = () => {
        if (newStudent.name) {
            const student = {
                id: students.length + 1,
                name: newStudent.name,
                class: newStudent.class,
                attendance: 'present',
                participation: 0
            };
            setStudents([...students, student]);
            setNewStudent({ name: '', class: 'Grade 10A', course: 'Mathematics' });
            setShowAddStudentModal(false);
        }
    };

    const filteredStudents = students.filter(s => {
        const matchesClass = s.class === selectedClass;
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesClass && matchesSearch;
    });

    const getAttendanceColor = (status: string) => {
        switch (status) {
            case 'present': return 'bg-green-500 hover:bg-green-600';
            case 'absent': return 'bg-red-500 hover:bg-red-600';
            case 'late': return 'bg-yellow-500 hover:bg-yellow-600';
            default: return 'bg-slate-300 hover:bg-slate-400';
        }
    };

    const stats = {
        present: filteredStudents.filter(s => s.attendance === 'present').length,
        absent: filteredStudents.filter(s => s.attendance === 'absent').length,
        late: filteredStudents.filter(s => s.attendance === 'late').length,
        total: filteredStudents.length
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">Daily Attendance & Participation</h2>
                        <p className="text-sm text-slate-600 font-medium mt-0.5">Mark attendance and track student participation</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowAddStudentModal(true)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                        >
                            <Plus size={18} />
                            <span className="text-sm">Add Student</span>
                        </button>
                        <button
                            onClick={handleSaveAttendance}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                        >
                            <Save size={20} />
                            <span className="text-sm">Save Changes</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="p-6">
                {/* Controls */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Date Selector */}
                    <div className="group">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Effective Date</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                                <CalendarIcon size={20} />
                            </div>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all shadow-sm group-hover:shadow-md"
                            />
                        </div>
                    </div>

                    {/* Class Selector */}
                    <div className="group">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Classroom Section</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all shadow-sm group-hover:shadow-md appearance-none"
                        >
                            {teacherInfo.classes.map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div className="group">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Quick Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Student name..."
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all shadow-sm group-hover:shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total', val: stats.total, icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' },
                        { label: 'Present', val: stats.present, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Late', val: stats.late, icon: Users, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                        { label: 'Absent', val: stats.absent, icon: Users, color: 'text-red-600', bg: 'bg-red-50' }
                    ].map((stat, i) => (
                        <div key={i} className={`bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                                    <stat.icon size={20} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <p className={`text-3xl font-black ${stat.color} leading-none`}>{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* Attendance List */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="px-10 py-8 border-b-2 border-slate-50 bg-gradient-to-r from-blue-50/20 to-white">
                        <h3 className="text-xl font-black text-slate-900">Live Attendance Roster</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">Section: <span className="text-blue-600 font-black">{selectedClass}</span> • Session: <span className="text-slate-900">{new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                    </div>
                    <div className="p-10">
                        <div className="space-y-6">
                            {filteredStudents.map((student) => (
                                <div key={student.id} className="group relative bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:bg-white transition-all duration-300">
                                    <div className="flex flex-col xl:flex-row xl:items-center gap-8">
                                        {/* Student Info */}
                                        <div className="flex items-center gap-5 flex-1">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-lg ring-4 ring-white group-hover:rotate-3 transition-transform">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-slate-900 tracking-tight">{student.name}</p>
                                                <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full uppercase tracking-widest">{student.class}</span>
                                            </div>
                                        </div>

                                        {/* Attendance Buttons */}
                                        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-[1.5rem] shadow-inner ring-1 ring-slate-100">
                                            {[
                                                { id: 'present', label: 'Present', color: 'bg-green-500 shadow-green-200' },
                                                { id: 'late', label: 'Running Late', color: 'bg-yellow-500 shadow-yellow-200' },
                                                { id: 'absent', label: 'Absent', color: 'bg-red-500 shadow-red-200' }
                                            ].map((btn) => (
                                                <button
                                                    key={btn.id}
                                                    onClick={() => handleAttendanceChange(student.id, btn.id)}
                                                    className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${student.attendance === btn.id ? btn.color + ' text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    {btn.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Participation Rating */}
                                        <div className="flex items-center gap-4 xl:border-l xl:pl-8 border-slate-200">
                                            <div className="hidden sm:block">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Participation</p>
                                                <p className="text-xs font-bold text-slate-900">{student.participation}/5 Scale</p>
                                            </div>
                                            <div className="flex gap-1.5 p-2 bg-slate-100/50 rounded-2xl shadow-inner">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <button
                                                        key={rating}
                                                        onClick={() => handleParticipationChange(student.id, rating)}
                                                        disabled={student.attendance === 'absent'}
                                                        className={`w-10 h-10 flex items-center justify-center transition-all rounded-xl ${student.attendance === 'absent'
                                                            ? 'opacity-20 cursor-not-allowed'
                                                            : rating <= student.participation
                                                                ? 'text-yellow-400 bg-white shadow-sm scale-110 rotate-12'
                                                                : 'text-slate-300 hover:text-yellow-200'
                                                            }`}
                                                    >
                                                        <span className="text-2xl leading-none">★</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredStudents.length === 0 && (
                                <div className="text-center py-20 bg-slate-50 rounded-[1.5rem] border-4 border-dashed border-slate-100">
                                    <Users className="mx-auto text-slate-200 mb-6" size={80} />
                                    <h4 className="text-2xl font-black text-slate-400 tracking-tight">Empty Classroom</h4>
                                    <p className="text-slate-500 font-bold mt-2">No students match your current filter settings.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Student Modal */}
            {showAddStudentModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full animate-fadeIn transform">
                        <div className="p-8 border-b border-slate-50">
                            <h3 className="text-2xl font-black text-slate-900">New Student Intake</h3>
                            <p className="text-slate-500 font-medium">Add a new student to your registry</p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Full Legal Name</label>
                                <input
                                    type="text"
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 shadow-inner"
                                    placeholder="Enter student name..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px) font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Class Section</label>
                                    <select
                                        value={newStudent.class}
                                        onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500/20"
                                    >
                                        {teacherInfo.classes.map((cls) => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Primary Course</label>
                                    <input
                                        type="text"
                                        value={newStudent.course}
                                        onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
                                        placeholder="Subject..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50/50 rounded-b-[2.5rem] flex gap-4">
                            <button
                                onClick={() => {
                                    setShowAddStudentModal(false);
                                    setNewStudent({ name: '', class: 'Grade 10A', course: 'Mathematics' });
                                }}
                                className="flex-1 px-4 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-white transition-all shadow-sm active:scale-95"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleAddStudent}
                                className="flex-1 px-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
                            >
                                Create Record
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
