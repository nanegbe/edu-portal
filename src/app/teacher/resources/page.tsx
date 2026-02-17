'use client';

import { useState } from 'react';
import { FileText, Upload, Link as LinkIcon, Video, File, Trash2, Download, Eye, Plus } from 'lucide-react';

export default function TeacherResources() {
    const [selectedCourse, setSelectedCourse] = useState('Algebra II');
    const [showUploadModal, setShowUploadModal] = useState(false);

    const teacherInfo = {
        name: 'Sarah Johnson',
        email: 'sarah.j@school.edu',
        subject: 'Mathematics',
        courses: ['Algebra II', 'Calculus', 'Geometry']
    };

    const [resources, setResources] = useState<any[]>([
        { id: 1, name: 'Chapter 5: Quadratic Functions', type: 'pdf', course: 'Algebra II', size: '2.4 MB', uploadDate: '2025-11-01', url: '#' },
        { id: 2, name: 'Factoring Techniques Tutorial', type: 'video', course: 'Algebra II', duration: '15:30', uploadDate: '2025-10-28', url: '#' },
        { id: 3, name: 'Khan Academy - Quadratics', type: 'link', course: 'Algebra II', uploadDate: '2025-10-25', url: 'https://khanacademy.org' },
        { id: 4, name: 'Homework Assignment 12', type: 'pdf', course: 'Algebra II', size: '0.8 MB', uploadDate: '2025-10-20', url: '#' },
        { id: 5, name: 'Derivatives Introduction', type: 'pdf', course: 'Calculus', size: '3.2 MB', uploadDate: '2025-11-02', url: '#' },
        { id: 6, name: 'Limits Explained', type: 'video', course: 'Calculus', duration: '22:15', uploadDate: '2025-10-30', url: '#' },
    ]);

    const [newResource, setNewResource] = useState<any>({
        name: '',
        type: 'pdf',
        course: 'Algebra II',
        url: '',
        file: null
    });

    const handleUploadResource = () => {
        if (newResource.name && (newResource.file || newResource.url)) {
            const resource = {
                id: resources.length + 1,
                name: newResource.name,
                type: newResource.type,
                course: newResource.course,
                size: newResource.file ? `${(Math.random() * 5).toFixed(1)} MB` : null,
                duration: newResource.type === 'video' ? '12:30' : null,
                uploadDate: new Date().toISOString().split('T')[0],
                url: newResource.url || '#'
            };
            setResources([...resources, resource]);
            setNewResource({ name: '', type: 'pdf', course: 'Algebra II', url: '', file: null });
            setShowUploadModal(false);
        }
    };

    const handleDeleteResource = (id: number) => {
        if (confirm('Are you sure you want to delete this resource?')) {
            setResources(resources.filter(r => r.id !== id));
        }
    };

    const getResourceIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <File className="text-red-500" size={24} />;
            case 'video': return <Video className="text-blue-500" size={24} />;
            case 'link': return <LinkIcon className="text-indigo-500" size={24} />;
            default: return <FileText className="text-slate-500" size={24} />;
        }
    };

    const filteredResources = resources.filter(r => r.course === selectedCourse);

    const stats = {
        total: filteredResources.length,
        pdfs: filteredResources.filter(r => r.type === 'pdf').length,
        videos: filteredResources.filter(r => r.type === 'video').length,
        links: filteredResources.filter(r => r.type === 'link').length
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40 hidden lg:block">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Resource Management</h2>
                        <p className="text-sm text-slate-600 mt-1">Organize and share learning materials with your classes</p>
                    </div>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Upload size={18} />
                        Upload Resource
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="p-6">
                <div className="flex flex-col xl:flex-row gap-6">
                    {/* Course Filter */}
                    <div className="w-full xl:w-72 space-y-4 shrink-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Select Course</h3>
                            <div className="space-y-1">
                                {teacherInfo.courses.map((course) => (
                                    <button
                                        key={course}
                                        onClick={() => setSelectedCourse(course)}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedCourse === course ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {course}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Course Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-sm text-slate-500">Total Items</span>
                                    <span className="text-sm font-bold text-slate-900">{stats.total}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-sm text-slate-500">Documents</span>
                                    <span className="text-sm font-bold text-red-600">{stats.pdfs}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-sm text-slate-500">Videos</span>
                                    <span className="text-sm font-bold text-blue-600">{stats.videos}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">Links</span>
                                    <span className="text-sm font-bold text-indigo-600">{stats.links}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="flex-1">
                        {filteredResources.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredResources.map((resource) => (
                                    <div key={resource.id} className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow group">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                                                {getResourceIcon(resource.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-900 truncate">{resource.name}</h4>
                                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                                                    {resource.type} • {resource.size || resource.duration || 'Web'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-xs text-slate-400">Added: {formatDateShort(resource.uploadDate)}</span>
                                            <div className="flex gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors" title="View">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors" title="Download">
                                                    <Download size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteResource(resource.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center">
                                <FileText className="mx-auto text-slate-200 mb-4" size={48} />
                                <h3 className="text-lg font-bold text-slate-400">No resources found</h3>
                                <p className="text-sm text-slate-500 mt-1">Upload materials for {selectedCourse} to get started.</p>
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Upload First Asset
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full animate-fadeIn">
                        <div className="p-6 border-b border-slate-200 border-dashed">
                            <h3 className="text-lg font-bold text-slate-900">Upload New Resource</h3>
                            <p className="text-sm text-slate-500 mt-1">Share documents, videos, or links with your students</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Resource Type</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'pdf', label: 'PDF/Doc', icon: File },
                                        { id: 'video', label: 'Video', icon: Video },
                                        { id: 'link', label: 'Web Link', icon: LinkIcon }
                                    ].map((mode) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => setNewResource({ ...newResource, type: mode.id })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${newResource.type === mode.id ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-blue-200'}`}
                                        >
                                            <mode.icon size={24} />
                                            <span className="text-xs font-bold uppercase tracking-wider">{mode.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={newResource.name}
                                        onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        placeholder="Enter descriptive name..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
                                    <select
                                        value={newResource.course}
                                        onChange={(e) => setNewResource({ ...newResource, course: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    >
                                        {teacherInfo.courses.map((course) => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>
                                </div>

                                {newResource.type === 'link' ? (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">URL</label>
                                        <input
                                            type="url"
                                            value={newResource.url}
                                            onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none font-medium text-blue-600"
                                            placeholder="https://..."
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">File</label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-300 transition-colors relative bg-slate-50">
                                            <Upload className="mx-auto text-slate-300 mb-2" size={32} />
                                            <p className="text-xs font-medium text-slate-500">
                                                {newResource.file ? newResource.file.name : `Click to upload ${newResource.type.toUpperCase()}`}
                                            </p>
                                            <input
                                                type="file"
                                                accept={newResource.type === 'pdf' ? '.pdf' : 'video/*'}
                                                onChange={(e: any) => setNewResource({ ...newResource, file: e.target.files[0] })}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-b-2xl flex gap-3">
                            <button
                                onClick={() => {
                                    setShowUploadModal(false);
                                    setNewResource({ name: '', type: 'pdf', course: 'Algebra II', url: '', file: null });
                                }}
                                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUploadResource}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};
