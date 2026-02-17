'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, User, Building2, ChevronLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        role: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const roles = [
        {
            id: 'principal',
            title: 'Principal',
            description: 'Administrative access for school operations',
            icon: Building2,
        },
        {
            id: 'teacher',
            title: 'Teacher',
            description: 'Classroom management and student tracking',
            icon: User,
        },
        {
            id: 'student',
            title: 'Student',
            description: 'Course materials and academic performance',
            icon: BookOpen,
        },
    ];

    const handleRoleSelect = (roleId: string) => {
        setFormData({ ...formData, role: roleId });
        setCurrentStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Login submitted:', formData);
            setIsLoading(false);

            // Redirect based on role
            if (formData.role === 'teacher') {
                router.push('/teacher');
            } else if (formData.role === 'student') {
                router.push('/student');
            } else {
                router.push('/dashboard');
            }
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

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 shadow-xl">
                        <span className="text-2xl font-bold text-white">E</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-300">
                        {currentStep === 1 ? 'Select your role to sign in' : `Signing in as ${formData.role}`}
                    </p>
                </div>

                {/* Content Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                    {currentStep === 1 ? (
                        // Step 1: Role Selection
                        <div className="space-y-4 animate-fadeIn">
                            <h2 className="text-xl font-semibold text-white mb-6 text-center">Identifying Your Role</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    return (
                                        <button
                                            key={role.id}
                                            onClick={() => handleRoleSelect(role.id)}
                                            className="p-5 bg-white/5 border-2 border-white/10 rounded-xl hover:bg-white/20 hover:border-blue-400 transition-all group text-left w-full flex items-center gap-4"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
                                                <Icon className="text-white" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                                                <p className="text-sm text-slate-300">{role.description}</p>
                                            </div>
                                            <ArrowRight className="ml-auto text-slate-400 group-hover:text-blue-400 transition-colors" size={20} />
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Sign Up Link */}
                            <div className="mt-8 text-center pt-4 border-t border-white/10">
                                <p className="text-slate-300">
                                    Don't have an account?{' '}
                                    <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Step 2: Login Form
                        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 mb-2"
                            >
                                <ChevronLeft size={16} />
                                Change role
                            </button>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                                    {formData.role === 'principal' ? 'Administrator Email' : 'Teacher Email'}
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

                            {/* Password Field */}
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
                                        className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                        placeholder="Enter your password"
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

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0"
                                    />
                                    <span className="ml-2 text-sm text-slate-300">Remember me</span>
                                </label>
                                <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    Forgot password?
                                </Link>
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
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <div className="text-center pt-4 border-t border-white/10">
                                <p className="text-slate-300">
                                    Don't have an account?{' '}
                                    <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-slate-400 relative z-10">
                    <p>© 2024 EduPortal. All rights reserved.</p>
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
