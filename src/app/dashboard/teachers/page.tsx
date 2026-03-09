'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, UserCheck, UserX, Search, Filter, Users, Copy, Check } from 'lucide-react';

export default function TeachersManagement() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showCredentialsModal, setShowCredentialsModal] = useState(false);
    const [credentials, setCredentials] = useState<any>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    // Dynamic data
    const [teachers, setTeachers] = useState<any[]>([]);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/teachers');
            const data = await res.json();
            setTeachers(data);
        } catch (error) {
            console.error('Failed to fetch teachers:', error);
        } finally {
            setLoading(false);
        }
    };

    const availableClasses = ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'];
    const availableCourses = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Art', 'Music', 'PE'];

    const [newTeacher, setNewTeacher] = useState({
        name: '',
        email: '',
        subject: '',
        status: 'active',
        classes: [],
        courses: []
    });

    const handleAddTeacher = async () => {
        if (newTeacher.name && newTeacher.email && newTeacher.subject) {
            try {
                const res = await fetch('/api/teachers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTeacher)
                });

                if (res.ok) {
                    const data = await res.json();
                    setCredentials(data.credentials);
                    setShowAddModal(false);
                    setShowCredentialsModal(true);
                    fetchTeachers();
                    setNewTeacher({ name: '', email: '', subject: '', status: 'active', classes: [], courses: [] });
                } else {
                    const err = await res.json();
                    alert(err.error || 'Failed to create teacher');
                }
            } catch (error) {
                alert('An error occurred while creating teacher');
            }
        }
    };

    const handleDeleteTeacher = async (id: string) => {
        if (confirm('Are you sure you want to delete this teacher?')) {
            try {
                const res = await fetch(`/api/teachers?id=${id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    fetchTeachers();
                } else {
                    const err = await res.json();
                    alert(err.error || 'Failed to delete teacher');
                }
            } catch (error) {
                alert('An error occurred while deleting teacher');
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        try {
            const res = await fetch(`/api/teachers?id=${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                fetchTeachers();
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to update status');
            }
        } catch (error) {
            alert('An error occurred while updating status');
        }
    };

    const handleAssignTeacher = async () => {
        if (selectedTeacher) {
            try {
                const res = await fetch('/api/teachers/assign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        teacherId: selectedTeacher.id,
                        classNames: selectedTeacher.classes
                    })
                });

                if (res.ok) {
                    setShowAssignModal(false);
                    setSelectedTeacher(null);
                    fetchTeachers();
                } else {
                    const err = await res.json();
                    alert(err.error || 'Failed to assign classes');
                }
            } catch (error) {
                alert('An error occurred while assigning classes');
            }
        }
    };

    const toggleClass = (className: string) => {
        if (selectedTeacher.classes.includes(className)) {
            setSelectedTeacher({
                ...selectedTeacher,
                classes: selectedTeacher.classes.filter((c: string) => c !== className)
            });
        } else {
            setSelectedTeacher({
                ...selectedTeacher,
                classes: [...selectedTeacher.classes, className]
            });
        }
    };

    const toggleCourse = (courseName: string) => {
        if (selectedTeacher.courses.includes(courseName)) {
            setSelectedTeacher({
                ...selectedTeacher,
                courses: selectedTeacher.courses.filter((c: string) => c !== courseName)
            });
        } else {
            setSelectedTeacher({
                ...selectedTeacher,
                courses: [...selectedTeacher.courses, courseName]
            });
        }
    };

    const filteredTeachers = teachers.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || teacher.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="hidden lg:block">
                        <h2 className="text-xl font-bold text-slate-900">Teachers Management</h2>
                        <p className="text-sm text-slate-600">Manage teachers, assignments, and status</p>
                    </div>
                    <div className="lg:hidden">
                        <h2 className="text-lg font-bold text-slate-900">Teachers</h2>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Add Teacher</span>
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="p-6">
                {/* Filters and Search */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="text-slate-400" size={20} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search teachers by name, email, or subject..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="text-slate-400" size={20} />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <Users className="text-white" size={24} />
                            </div>
                            <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Teachers</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{teachers.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                                <UserCheck className="text-white" size={24} />
                            </div>
                            <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Active Teachers</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{teachers.filter(t => t.status === 'active').length}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                                <UserX className="text-white" size={24} />
                            </div>
                            <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Inactive Teachers</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{teachers.filter(t => t.status === 'inactive').length}</p>
                    </div>
                </div>

                {/* Teachers List */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Teacher</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Subject</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Classes</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Courses</th>
                                    <th className="text-center py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                    <th className="text-center py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredTeachers.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                                                    {teacher.name.split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{teacher.name}</p>
                                                    <p className="text-sm text-slate-500">{teacher.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {teacher.subject}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-wrap gap-1">
                                                {teacher.classes.slice(0, 2).map((cls: string, idx: number) => (
                                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                                                        {cls}
                                                    </span>
                                                ))}
                                                {teacher.classes.length > 2 && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                                                        +{teacher.classes.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-wrap gap-1">
                                                {teacher.courses.slice(0, 2).map((course: string, idx: number) => (
                                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                                                        {course}
                                                    </span>
                                                ))}
                                                {teacher.courses.length > 2 && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                                                        +{teacher.courses.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => handleToggleStatus(teacher.id, teacher.status)}
                                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${teacher.status === 'active'
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                            >
                                                {teacher.status === 'active' ? <UserCheck size={14} /> : <UserX size={14} />}
                                                {teacher.status === 'active' ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedTeacher(teacher);
                                                        setShowAssignModal(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Assign Classes/Courses"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTeacher(teacher.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Teacher"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredTeachers.length === 0 && (
                            <div className="text-center py-12">
                                <Users className="mx-auto text-slate-300 mb-3" size={48} />
                                <p className="text-slate-600 font-medium">No teachers found</p>
                                <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add Teacher Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900">Add New Teacher</h3>
                            <p className="text-sm text-slate-600 mt-1">Fill in the teacher details</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={newTeacher.name}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={newTeacher.email}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="john@school.edu"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={newTeacher.subject}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Mathematics"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                <select
                                    value={newTeacher.status}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewTeacher({ name: '', email: '', subject: '', status: 'active', classes: [], courses: [] });
                                }}
                                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTeacher}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                            >
                                Add Teacher
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Classes/Courses Modal */}
            {showAssignModal && selectedTeacher && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900">Assign Classes & Courses</h3>
                            <p className="text-sm text-slate-600 mt-1">{selectedTeacher.name}</p>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Assign Classes */}
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-3">Assign Classes</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {availableClasses.map((cls) => (
                                        <button
                                            key={cls}
                                            onClick={() => toggleClass(cls)}
                                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm ${selectedTeacher.classes.includes(cls)
                                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
                                                }`}
                                        >
                                            {cls}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Assign Courses */}
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-3">Assign Courses</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {availableCourses.map((course) => (
                                        <button
                                            key={course}
                                            onClick={() => toggleCourse(course)}
                                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm ${selectedTeacher.courses.includes(course)
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-green-300'
                                                }`}
                                        >
                                            {course}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowAssignModal(false);
                                    setSelectedTeacher(null);
                                }}
                                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssignTeacher}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                            >
                                Save Assignments
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Credentials Reveal Modal */}
            {showCredentialsModal && credentials && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-fadeIn border-t-8 border-blue-600">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <UserCheck className="text-blue-600" size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">Teacher Created!</h3>
                            <p className="text-slate-500 font-medium">Please save these credentials to share with the teacher.</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Login Email</label>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-slate-900">{credentials.email}</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(credentials.email);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Auto-Generated Password</label>
                                <div className="flex items-center justify-between">
                                    <p className="font-mono font-bold text-blue-600 text-lg tracking-wider">{credentials.password}</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(credentials.password);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setShowCredentialsModal(false);
                                setCredentials(null);
                            }}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                            {copied ? <Check size={20} className="text-green-400" /> : null}
                            {copied ? 'Copied to Clipboard' : 'I have saved these'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
