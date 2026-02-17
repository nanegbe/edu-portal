'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Building2, ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        role: '',
        fullName: '',
        email: '',
        schoolName: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const roles = [
        {
            id: 'principal',
            title: 'Principal',
            description: 'Manage school operations and oversee all activities',
            icon: Building2,
        },
        {
            id: 'teacher',
            title: 'Teacher',
            description: 'Manage classes, students, and track performance',
            icon: User,
        },
        {
            id: 'student',
            title: 'Student',
            description: 'Access course materials and track progress',
            icon: BookOpen,
        },
    ];

    const handleRoleSelect = (roleId: string) => {
        setFormData({ ...formData, role: roleId });
        setCurrentStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Signup submitted:', formData);
            setIsLoading(false);
            // Redirect to login or dashboard
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-2xl relative z-10">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 shadow-xl">
                        <span className="text-2xl font-bold text-white">E</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
                    <p className="text-slate-300">Join EduPortal and start managing your school</p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                            {currentStep > 1 ? <CheckCircle size={20} /> : '1'}
                        </div>
                        <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-white' : 'text-slate-400'}`}>Role</span>
                    </div>
                    <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-white/20'}`}></div>
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                            2
                        </div>
                        <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-white' : 'text-slate-400'}`}>Details</span>
                    </div>
                </div>

                {/* Signup Form */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                    {currentStep === 1 ? (
                        // Step 1: Role Selection
                        <div className="space-y-4 animate-fadeIn">
                            <h2 className="text-xl font-semibold text-white mb-6 text-center">Select Your Role</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    return (
                                        <button
                                            key={role.id}
                                            onClick={() => handleRoleSelect(role.id)}
                                            className="p-6 bg-white/10 border-2 border-white/20 rounded-xl hover:bg-white/20 hover:border-blue-400 transition-all group text-left w-full"
                                        >
                                            <div className="flex flex-col items-center text-center gap-4">
                                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Icon className="text-white" size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white mb-2">{role.title}</h3>
                                                    <p className="text-sm text-slate-300">{role.description}</p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Already have account */}
                            <div className="mt-6 text-center">
                                <p className="text-slate-300">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Step 2: Form Details
                        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                            >
                                <ArrowRight size={16} className="rotate-180" />
                                Change role
                            </button>

                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-200 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="text-slate-400" size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="text-slate-400" size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                        placeholder="you@school.edu"
                                    />
                                </div>
                            </div>

                            {/* School Name (only for principals) */}
                            {formData.role === 'principal' && (
                                <div>
                                    <label htmlFor="schoolName" className="block text-sm font-medium text-slate-200 mb-2">
                                        School Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Building2 className="text-slate-400" size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            id="schoolName"
                                            name="schoolName"
                                            value={formData.schoolName}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                            placeholder="Springfield High School"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="text-slate-400" size={20} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                        className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                        placeholder="Minimum 8 characters"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="text-slate-400" size={20} />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                        className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                        placeholder="Re-enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="w-4 h-4 mt-1 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0"
                                />
                                <label htmlFor="terms" className="ml-3 text-sm text-slate-300">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            {/* Sign In Link */}
                            <div className="text-center">
                                <p className="text-slate-300">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-slate-400">
                    <p>© 2024 EduPortal. All rights reserved.</p>
                </div>
            </div>

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
        </div>
    );
}
