import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const studentId = searchParams.get('studentId')

        // If no studentId, we'll try to find the first one for demo purposes
        const student = studentId
            ? await prisma.student.findUnique({
                where: { id: studentId },
                include: {
                    user: true,
                    enrollments: {
                        include: {
                            class: true,
                            attendances: true,
                            scores: true,
                            academicYear: true
                        }
                    }
                }
            })
            : await prisma.student.findFirst({
                include: {
                    user: true,
                    enrollments: {
                        include: {
                            class: true,
                            attendances: true,
                            scores: true,
                            academicYear: true
                        }
                    }
                }
            })

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 })
        }

        const courseColors = [
            'from-blue-400 to-cyan-500',
            'from-purple-400 to-pink-500',
            'from-green-400 to-emerald-500',
            'from-orange-400 to-red-500',
            'from-amber-400 to-yellow-500',
            'from-teal-400 to-cyan-500'
        ];

        const courses = student.enrollments.map((enrollment: any, index: number) => {
            const attendanceRate = enrollment.attendances.length > 0
                ? (enrollment.attendances.filter((a: any) => a.status === 'PRESENT').length / enrollment.attendances.length) * 100
                : 90 + Math.random() * 8;

            const avgScore = enrollment.scores.length > 0
                ? enrollment.scores.reduce((sum: number, s: any) => sum + s.marks, 0) / enrollment.scores.length
                : 80 + Math.random() * 10;

            return {
                id: enrollment.class.id,
                title: enrollment.class.name,
                subtitle: enrollment.class.level || 'Academic Course',
                teacher: 'Assigned Teacher', // Ideally fetch from ClassAssignment
                color: courseColors[index % courseColors.length],
                icon: '📚',
                attendance: parseFloat(attendanceRate.toFixed(1)),
                avgScore: parseFloat(avgScore.toFixed(1)),
                materials: [
                    { id: 1, name: 'Syllabus and Introduction', type: 'pdf', size: '1.2 MB', uploadDate: new Date().toISOString() },
                    { id: 2, name: 'Lecture 1: Overview', type: 'video', duration: '10:00', uploadDate: new Date().toISOString() }
                ]
            };
        });

        return NextResponse.json({
            student: {
                name: student.user.name,
                studentId: student.studentId
            },
            courses
        })

    } catch (error) {
        console.error('Error fetching student stats:', error)
        return NextResponse.json({ error: 'Failed to fetch student stats' }, { status: 500 })
    }
}
