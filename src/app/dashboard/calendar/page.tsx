'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Edit, Trash2, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function AcademicCalendar() {
    const [showAddYearModal, setShowAddYearModal] = useState(false);
    const [showEditSemesterModal, setShowEditSemesterModal] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState<any>(null);

    // Mock data
    const [academicYears, setAcademicYears] = useState([
        {
            id: 1,
            year: '2024/2025',
            type: 'semester',
            status: 'completed',
            semesters: [
                {
                    id: 1,
                    name: 'Fall 2024',
                    startDate: '2024-09-01',
                    endDate: '2024-12-20',
                    status: 'completed',
                    isActive: false
                },
                {
                    id: 2,
                    name: 'Spring 2025',
                    startDate: '2025-01-15',
                    endDate: '2025-05-30',
                    status: 'completed',
                    isActive: false
                }
            ]
        },
        {
            id: 2,
            year: '2025/2026',
            type: 'semester',
            status: 'active',
            semesters: [
                {
                    id: 3,
                    name: 'Fall 2025',
                    startDate: '2025-09-01',
                    endDate: '2025-12-20',
                    status: 'active',
                    isActive: true
                },
                {
                    id: 4,
                    name: 'Spring 2026',
                    startDate: '2026-01-15',
                    endDate: '2026-05-30',
                    status: 'upcoming',
                    isActive: false
                }
            ]
        },
        {
            id: 3,
            year: '2026/2027',
            type: 'semester',
            status: 'upcoming',
            semesters: [
                {
                    id: 5,
                    name: 'Fall 2026',
                    startDate: '2026-09-01',
                    endDate: '2026-12-20',
                    status: 'upcoming',
                    isActive: false
                },
                {
                    id: 6,
                    name: 'Spring 2027',
                    startDate: '2027-01-15',
                    endDate: '2027-05-30',
                    status: 'upcoming',
                    isActive: false
                }
            ]
        }
    ]);

    const [newYear, setNewYear] = useState({
        year: '',
        type: 'semester' as 'semester' | 'trimester',
        term1Start: '',
        term1End: '',
        term2Start: '',
        term2End: '',
        term3Start: '',
        term3End: ''
    });

    const getActiveSemester = () => {
        for (const year of academicYears) {
            for (const semester of year.semesters) {
                if (semester.isActive) {
                    return { ...semester, academicYear: year.year };
                }
            }
        }
        return null;
    };

    const handleAddAcademicYear = () => {
        const { year, type, term1Start, term1End, term2Start, term2End, term3Start, term3End } = newYear;

        const isSemesterValid = type === 'semester' && year && term1Start && term1End && term2Start && term2End;
        const isTrimesterValid = type === 'trimester' && year && term1Start && term1End && term2Start && term2End && term3Start && term3End;

        if (isSemesterValid || isTrimesterValid) {
            const semesters = [
                {
                    id: Date.now(),
                    name: type === 'semester' ? 'First Semester' : 'First Term',
                    startDate: term1Start,
                    endDate: term1End,
                    status: 'upcoming',
                    isActive: false
                },
                {
                    id: Date.now() + 1,
                    name: type === 'semester' ? 'Second Semester' : 'Second Term',
                    startDate: term2Start,
                    endDate: term2End,
                    status: 'upcoming',
                    isActive: false
                }
            ];

            if (type === 'trimester') {
                semesters.push({
                    id: Date.now() + 2,
                    name: 'Third Term',
                    startDate: term3Start,
                    endDate: term3End,
                    status: 'upcoming',
                    isActive: false
                });
            }

            const academicYear = {
                id: academicYears.length + 1,
                year: year,
                type: type,
                status: 'upcoming',
                semesters: semesters
            };

            setAcademicYears([...academicYears, academicYear]);
            setNewYear({
                year: '',
                type: 'semester',
                term1Start: '', term1End: '',
                term2Start: '', term2End: '',
                term3Start: '', term3End: ''
            });
            setShowAddYearModal(false);
        }
    };

    const handleUpdateSemester = () => {
        if (selectedSemester) {
            setAcademicYears(academicYears.map(year => ({
                ...year,
                semesters: year.semesters.map(sem =>
                    sem.id === selectedSemester.id ? selectedSemester : sem
                )
            })));
            setShowEditSemesterModal(false);
            setSelectedSemester(null);
        }
    };

    const handleSetActiveSemester = (yearId: number, semesterId: number) => {
        setAcademicYears(academicYears.map(year => ({
            ...year,
            semesters: year.semesters.map(sem => ({
                ...sem,
                isActive: year.id === yearId && sem.id === semesterId
            }))
        })));
    };

    const handleDeleteYear = (yearId: number) => {
        if (confirm('Are you sure you want to delete this academic year? This will remove all associated data.')) {
            setAcademicYears(academicYears.filter(y => y.id !== yearId));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getSemesterStatus = (startDate: string, endDate: string) => {
        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (today < start) return 'upcoming';
        if (today > end) return 'completed';
        return 'active';
    };

    const activeSemester = getActiveSemester();

    return (
        <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="hidden lg:block">
                        <h2 className="text-xl font-bold text-slate-900">Academic Calendar</h2>
                        <p className="text-sm text-slate-600">Manage academic years and semesters</p>
                    </div>
                    <div className="lg:hidden">
                        <h2 className="text-lg font-bold text-slate-900">Calendar</h2>
                    </div>
                    <button
                        onClick={() => setShowAddYearModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Add Academic Year</span>
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="p-6">
                {/* Active Semester Banner */}
                {activeSemester && (
                    <div className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white animate-fadeIn">
                        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 size={24} />
                                    <h3 className="text-lg font-bold">Currently Active Semester</h3>
                                </div>
                                <p className="text-2xl font-bold mb-1">{activeSemester.name}</p>
                                <p className="text-blue-100 italic">Academic Year: {activeSemester.academicYear}</p>
                                <p className="text-sm text-blue-100 mt-2 font-medium">
                                    {formatDate(activeSemester.startDate)} - {formatDate(activeSemester.endDate)}
                                </p>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                                <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg font-semibold text-sm flex items-center gap-2">
                                    <Clock size={16} />
                                    Active Now
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-white/10 backdrop-blur rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold mb-1 text-sm">System Integration Notice</p>
                                    <p className="text-xs text-blue-100 leading-relaxed">
                                        All attendance, participation, and academic data will be recorded under this semester.
                                        Data entry outside the active semester period is restricted.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Academic Years List */}
                <div className="space-y-6">
                    {academicYears.map((year) => (
                        <div key={year.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                            {/* Year Header */}
                            <div className={`p-6 border-b border-slate-200 ${year.status === 'active' ? 'bg-gradient-to-r from-blue-50/50 to-indigo-50/50' : 'bg-slate-50/50'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-inner">
                                            <CalendarIcon className="text-white" size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900">Academic Year {year.year}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                {year.status === 'active' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                        <CheckCircle2 size={12} />
                                                        Active
                                                    </span>
                                                )}
                                                {year.status === 'upcoming' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                        <Clock size={12} />
                                                        Upcoming
                                                    </span>
                                                )}
                                                {year.status === 'completed' && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                        <XCircle size={12} />
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteYear(year.id)}
                                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all hover:scale-110 active:scale-95"
                                        title="Delete Academic Year"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Semesters */}
                            <div className="p-6">
                                <div className={`grid grid-cols-1 gap-6 ${year.semesters.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                                    {year.semesters.map((semester) => {
                                        const status = getSemesterStatus(semester.startDate, semester.endDate);
                                        return (
                                            <div
                                                key={semester.id}
                                                className={`relative border-2 rounded-2xl p-6 transition-all duration-300 ${semester.isActive
                                                    ? 'border-blue-500 bg-blue-50/30'
                                                    : 'border-slate-100 bg-white hover:border-slate-200'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-bold text-slate-900 mb-2">{semester.name}</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {semester.isActive && (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wide shadow-md">
                                                                    <CheckCircle2 size={10} />
                                                                    Active Now
                                                                </span>
                                                            )}
                                                            {!semester.isActive && status === 'upcoming' && (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                                                                    <Clock size={10} />
                                                                    Upcoming
                                                                </span>
                                                            )}
                                                            {!semester.isActive && status === 'completed' && (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                                                                    <XCircle size={10} />
                                                                    Completed
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedSemester(semester);
                                                            setShowEditSemesterModal(true);
                                                        }}
                                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                        title="Edit Semester"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                </div>

                                                <div className="space-y-3 mb-6">
                                                    <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                                                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Start</span>
                                                        <span className="text-sm text-slate-900 font-bold">{formatDate(semester.startDate)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                                                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">End</span>
                                                        <span className="text-sm text-slate-900 font-bold">{formatDate(semester.endDate)}</span>
                                                    </div>
                                                </div>

                                                {!semester.isActive && status === 'upcoming' && (
                                                    <button
                                                        onClick={() => handleSetActiveSemester(year.id, semester.id)}
                                                        className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all active:scale-[0.98]"
                                                    >
                                                        Set as Active
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rules Section */}
                <div className="mt-10 bg-white/40 backdrop-blur-sm rounded-3xl border border-white shadow-xl p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                            <AlertCircle className="text-white" size={40} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Calendar Master Rules</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/60 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                                    <p className="text-xs font-extrabold text-blue-600 uppercase mb-2 tracking-widest">Single Source</p>
                                    <p className="text-sm font-medium text-slate-700">Only one semester can be active nationwide across the portal.</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                                    <p className="text-xs font-extrabold text-indigo-600 uppercase mb-2 tracking-widest">Automatic Binding</p>
                                    <p className="text-sm font-medium text-slate-700">All student activity is tied to the current active semester.</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                                    <p className="text-xs font-extrabold text-purple-600 uppercase mb-2 tracking-widest">Date Locking</p>
                                    <p className="text-sm font-medium text-slate-700">System restricts data entry outside the current defined period.</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                                    <p className="text-xs font-extrabold text-teal-600 uppercase mb-2 tracking-widest">Dashboard Link</p>
                                    <p className="text-sm font-medium text-slate-700">All analytics update instantly based on calendar settings.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Year Modal */}
            {showAddYearModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn transform">
                        <div className="p-8 border-b border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900">New Academic Year</h3>
                            <p className="text-slate-500 font-medium">Define the timeframe for the upcoming year</p>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-500 uppercase mb-3 tracking-widest">Year Identification</label>
                                    <input
                                        type="text"
                                        value={newYear.year}
                                        onChange={(e) => setNewYear({ ...newYear, year: e.target.value })}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
                                        placeholder="e.g. 2027/2028"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-500 uppercase mb-3 tracking-widest">System Type</label>
                                    <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                                        <button
                                            onClick={() => setNewYear({ ...newYear, type: 'semester' })}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${newYear.type === 'semester' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Semester
                                        </button>
                                        <button
                                            onClick={() => setNewYear({ ...newYear, type: 'trimester' })}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${newYear.type === 'trimester' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Trimester
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-black text-slate-900 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm">1</span>
                                        {newYear.type === 'semester' ? 'First Semester' : 'First Term'}
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={newYear.term1Start}
                                                onChange={(e) => setNewYear({ ...newYear, term1Start: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={newYear.term1End}
                                                onChange={(e) => setNewYear({ ...newYear, term1End: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-black text-slate-900 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm">2</span>
                                        {newYear.type === 'semester' ? 'Second Semester' : 'Second Term'}
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={newYear.term2Start}
                                                onChange={(e) => setNewYear({ ...newYear, term2Start: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={newYear.term2End}
                                                onChange={(e) => setNewYear({ ...newYear, term2End: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {newYear.type === 'trimester' && (
                                    <div className="space-y-4 animate-fadeIn">
                                        <h4 className="font-black text-slate-900 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 text-sm">3</span>
                                            Third Term
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={newYear.term3Start}
                                                    onChange={(e) => setNewYear({ ...newYear, term3Start: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">End Date</label>
                                                <input
                                                    type="date"
                                                    value={newYear.term3End}
                                                    onChange={(e) => setNewYear({ ...newYear, term3End: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50/50 flex gap-4">
                            <button
                                onClick={() => {
                                    setShowAddYearModal(false);
                                    setNewYear({
                                        year: '',
                                        type: 'semester',
                                        term1Start: '', term1End: '',
                                        term2Start: '', term2End: '',
                                        term3Start: '', term3End: ''
                                    });
                                }}
                                className="flex-1 px-6 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-white transition-all shadow-sm"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleAddAcademicYear}
                                className="flex-[2] px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Initialize Academic Year
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Semester Modal */}
            {showEditSemesterModal && selectedSemester && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fadeIn">
                        <div className="p-8 border-b border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900">Edit Settings</h3>
                            <p className="text-slate-500 font-medium">{selectedSemester.name}</p>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Semester Name</label>
                                <input
                                    type="text"
                                    value={selectedSemester.name}
                                    onChange={(e) => setSelectedSemester({ ...selectedSemester, name: e.target.value })}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Start</label>
                                    <input
                                        type="date"
                                        value={selectedSemester.startDate}
                                        onChange={(e) => setSelectedSemester({ ...selectedSemester, startDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">End</label>
                                    <input
                                        type="date"
                                        value={selectedSemester.endDate}
                                        onChange={(e) => setSelectedSemester({ ...selectedSemester, endDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50/50 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowEditSemesterModal(false);
                                    setSelectedSemester(null);
                                }}
                                className="flex-1 px-6 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSemester}
                                className="flex-[2] px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
