'use client';

import { useState } from 'react';
import {
    UserPlus, Calendar, Mail, Phone, MapPin, User, Users, GraduationCap,
    ArrowRight, CheckCircle2, AlertCircle, Globe, Image, Briefcase,
    AlertTriangle, Activity, FileText, CreditCard, History, UserCheck
} from 'lucide-react';

export default function AdmissionsPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        // 1. Student Information
        studentName: '',
        dateOfBirth: '',
        gender: '',
        placeOfBirth: '',
        nationality: '',
        address: '',
        studentPhoto: null as File | null,

        // 2. Parent/Guardian Information
        guardianName: '',
        relationship: '',
        guardianPhone: '',
        guardianEmail: '',
        guardianOccupation: '',
        guardianAddress: '',

        // 3. Academic Information
        grade: '',
        previousSchool: '',
        lastClassCompleted: '',

        // 4. Emergency Contact
        emergencyContactName: '',
        emergencyRelationship: '',
        emergencyPhone: '',

        // 5. Basic Medical Information
        knownAllergies: '',
        medicalConditions: '',
        bloodGroup: '',

        // 6. Administrative Information
        admissionDate: new Date().toISOString().split('T')[0],
        studentId: '',
        paymentStatus: 'Pending'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, studentPhoto: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation: Required fields check
        const requiredFields = [
            'studentName', 'dateOfBirth', 'gender', 'placeOfBirth', 'nationality', 'address',
            'guardianName', 'relationship', 'guardianPhone', 'guardianEmail', 'guardianAddress',
            'grade', 'emergencyContactName', 'emergencyRelationship', 'emergencyPhone',
            'admissionDate', 'studentId'
        ];

        const isFormValid = requiredFields.every(field => {
            const value = formData[field as keyof typeof formData];
            return typeof value === 'string' && value.trim() !== '';
        });

        if (isFormValid) {
            try {
                setIsLoading(true);
                const res = await fetch('/api/students', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (res.ok) {
                    setIsSubmitted(true);
                    setIsError(false);
                    // Reset form after a delay
                    setTimeout(() => {
                        setIsSubmitted(false);
                        setFormData({
                            studentName: '',
                            dateOfBirth: '',
                            gender: '',
                            placeOfBirth: '',
                            nationality: '',
                            address: '',
                            studentPhoto: null,
                            guardianName: '',
                            relationship: '',
                            guardianPhone: '',
                            guardianEmail: '',
                            guardianOccupation: '',
                            guardianAddress: '',
                            grade: '',
                            previousSchool: '',
                            lastClassCompleted: '',
                            emergencyContactName: '',
                            emergencyRelationship: '',
                            emergencyPhone: '',
                            knownAllergies: '',
                            medicalConditions: '',
                            bloodGroup: '',
                            admissionDate: new Date().toISOString().split('T')[0],
                            studentId: '',
                            paymentStatus: 'Pending'
                        });
                    }, 3000);
                } else {
                    const err = await res.json();
                    setIsError(true);
                    setErrorMessage(err.error || 'Failed to admit student');
                    setTimeout(() => setIsError(false), 3000);
                }
            } catch (error) {
                setIsError(true);
                setErrorMessage('An error occurred during submission');
                setTimeout(() => setIsError(false), 3000);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsError(true);
            setErrorMessage('Please fill in all required fields');
            setTimeout(() => setIsError(false), 3000);
        }
    };

    return (
        <main className="p-6 max-w-5xl mx-auto">
            {/* Header Area */}
            <div className="mb-8 animate-fadeIn">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                        <UserPlus size={24} />
                    </div>
                    Student Admission
                </h1>
                <p className="text-slate-600 mt-2">Register a new student into the school system.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Student Information */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn [animation-delay:100ms]">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                        <User className="text-blue-600" size={20} />
                        <h2 className="font-bold text-slate-800">1. Student Information</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                required
                                type="text"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleChange}
                                placeholder="Enter student's full name"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Calendar size={18} />
                                </span>
                                <input
                                    required
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                            <select
                                required
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Place of Birth</label>
                            <input
                                required
                                type="text"
                                name="placeOfBirth"
                                value={formData.placeOfBirth}
                                onChange={handleChange}
                                placeholder="City/Town"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Globe size={18} />
                                </span>
                                <input
                                    required
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    placeholder="Enter nationality"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Home Address</label>
                            <div className="relative">
                                <span className="absolute top-3 left-3 flex items-start pointer-events-none text-slate-400">
                                    <MapPin size={18} />
                                </span>
                                <textarea
                                    required
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Enter full residential address"
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Student Photograph</label>
                            <div className="relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                                <div className="space-y-1 text-center">
                                    <Image className="mx-auto h-8 w-8 text-slate-400" />
                                    <div className="flex text-sm text-slate-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                            <span>{formData.studentPhoto ? formData.studentPhoto.name : 'Upload a file'}</span>
                                            <input
                                                name="studentPhoto"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Parent/Guardian Information */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn [animation-delay:200ms]">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                        <Users className="text-indigo-600" size={20} />
                        <h2 className="font-bold text-slate-800">2. Parent/Guardian Information</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Parent/Guardian Full Name</label>
                            <input
                                required
                                type="text"
                                name="guardianName"
                                value={formData.guardianName}
                                onChange={handleChange}
                                placeholder="Enter guardian's full name"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Relationship to Student</label>
                            <select
                                required
                                name="relationship"
                                value={formData.relationship}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
                            >
                                <option value="">Select Relationship</option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                                <option value="Guardian">Guardian</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Phone size={18} />
                                </span>
                                <input
                                    required
                                    type="tel"
                                    name="guardianPhone"
                                    value={formData.guardianPhone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Occupation</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Briefcase size={18} />
                                </span>
                                <input
                                    required
                                    type="text"
                                    name="guardianOccupation"
                                    value={formData.guardianOccupation}
                                    onChange={handleChange}
                                    placeholder="Enter occupation"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </span>
                                <input
                                    required
                                    type="email"
                                    name="guardianEmail"
                                    value={formData.guardianEmail}
                                    onChange={handleChange}
                                    placeholder="guardian@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Residential Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <MapPin size={18} />
                                </span>
                                <input
                                    required
                                    name="guardianAddress"
                                    value={formData.guardianAddress}
                                    onChange={handleChange}
                                    placeholder="Enter guardian's address"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Academic Information */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn [animation-delay:300ms]">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                        <GraduationCap className="text-emerald-600" size={20} />
                        <h2 className="font-bold text-slate-800">3. Academic Information</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Class Applying For</label>
                            <select
                                required
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
                            >
                                <option value="">Select Grade</option>
                                <option value="Basic 1">Basic 1</option>
                                <option value="Basic 2">Basic 2</option>
                                <option value="Basic 3">Basic 3</option>
                                <option value="JHS 1">JHS 1</option>
                                <option value="JHS 2">JHS 2</option>
                                <option value="JHS 3">JHS 3</option>
                                <option value="SHS 1">SHS 1</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Previous School Attended</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <History size={18} />
                                </span>
                                <input
                                    type="text"
                                    name="previousSchool"
                                    value={formData.previousSchool}
                                    onChange={handleChange}
                                    placeholder="Enter school name"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Class Completed</label>
                            <input
                                type="text"
                                name="lastClassCompleted"
                                value={formData.lastClassCompleted}
                                onChange={handleChange}
                                placeholder="E.g. Grade 8"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
                            />
                        </div>
                    </div>
                </section>

                {/* Section 4: Emergency Contact */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn [animation-delay:400ms]">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                        <AlertTriangle className="text-orange-600" size={20} />
                        <h2 className="font-bold text-slate-800">4. Emergency Contact</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <UserCheck size={18} />
                                </span>
                                <input
                                    required
                                    type="text"
                                    name="emergencyContactName"
                                    value={formData.emergencyContactName}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Relationship</label>
                            <input
                                required
                                type="text"
                                name="emergencyRelationship"
                                value={formData.emergencyRelationship}
                                onChange={handleChange}
                                placeholder="E.g. Uncle, Neighbor"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Phone size={18} />
                                </span>
                                <input
                                    required
                                    type="tel"
                                    name="emergencyPhone"
                                    value={formData.emergencyPhone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Basic Medical Information */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn [animation-delay:500ms]">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                        <Activity className="text-rose-600" size={20} />
                        <h2 className="font-bold text-slate-800">5. Basic Medical Information</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Known Allergies</label>
                            <input
                                type="text"
                                name="knownAllergies"
                                value={formData.knownAllergies}
                                onChange={handleChange}
                                placeholder="E.g. Peanuts, Penicillin"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-slate-900"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Medical Conditions</label>
                            <input
                                type="text"
                                name="medicalConditions"
                                value={formData.medicalConditions}
                                onChange={handleChange}
                                placeholder="E.g. Asthma, Diabetes"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group (Optional)</label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
                            >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Section 6: Administrative Information */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn [animation-delay:600ms]">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                        <FileText className="text-slate-600" size={20} />
                        <h2 className="font-bold text-slate-800">6. Administrative Information</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Admission Date</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Calendar size={18} />
                                </span>
                                <input
                                    required
                                    type="date"
                                    name="admissionDate"
                                    value={formData.admissionDate}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Student ID/Index Number</label>
                            <input
                                required
                                type="text"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                placeholder="E.g. SCH-2024-001"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all text-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Fee Payment Status</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <CreditCard size={18} />
                                </span>
                                <select
                                    required
                                    name="paymentStatus"
                                    value={formData.paymentStatus}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Part-Paid">Part-Paid</option>
                                    <option value="Paid">Fully Paid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                {isSubmitted && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 animate-fadeIn">
                        <CheckCircle2 size={24} className="text-green-600" />
                        <div>
                            <p className="font-bold">Admission Successful!</p>
                            <p className="text-sm">The student has been successfully registered. The index number is their temporary login ID.</p>
                        </div>
                    </div>
                )}

                {isError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800 animate-fadeIn">
                        <AlertCircle size={24} className="text-red-600" />
                        <div>
                            <p className="font-bold">Submission Failed</p>
                            <p className="text-sm">{errorMessage || 'Please fill in all required fields before submitting.'}</p>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-end gap-4 pb-12 animate-fadeIn [animation-delay:300ms]">
                    <button
                        type="button"
                        onClick={() => setFormData({
                            studentName: '',
                            dateOfBirth: '',
                            gender: '',
                            placeOfBirth: '',
                            nationality: '',
                            address: '',
                            studentPhoto: null,
                            guardianName: '',
                            relationship: '',
                            guardianPhone: '',
                            guardianEmail: '',
                            guardianOccupation: '',
                            guardianAddress: '',
                            grade: '',
                            previousSchool: '',
                            lastClassCompleted: '',
                            emergencyContactName: '',
                            emergencyRelationship: '',
                            emergencyPhone: '',
                            knownAllergies: '',
                            medicalConditions: '',
                            bloodGroup: '',
                            admissionDate: new Date().toISOString().split('T')[0],
                            studentId: '',
                            paymentStatus: 'Pending'
                        })}
                        className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                    >
                        Clear Form
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl active:scale-95 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Admitting...' : 'Admit Student'}
                        {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </form>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </main>
    );
}
