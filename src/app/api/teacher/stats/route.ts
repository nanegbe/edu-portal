import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const teacherId = searchParams.get('teacherId')

        // If no teacherId, we'll try to find the first one for demo purposes
        // In a real app, this would come from the session
        let teacher;
        if (teacherId) {
            teacher = await prisma.teacher.findUnique({
                where: { id: teacherId },
                include: { user: true }
            })
        } else {
            teacher = await prisma.teacher.findFirst({
                include: { user: true }
            })
        }

        if (!teacher) {
            return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
        }

        // Get all classes assigned to this teacher
        const assignments = await prisma.classAssignment.findMany({
            where: { teacherId: teacher.id },
            include: {
                class: {
                    include: {
                        enrollments: {
                            include: {
                                student: {
                                    include: {
                                        user: true
                                    }
                                },
                                attendances: true,
                                scores: true
                            }
                        }
                    }
                }
            }
        })

        const allStudentsMap = new Map();
        let totalAttendanceSum = 0;
        let studentsWithAttendance = 0;
        let totalScoreSum = 0;
        let studentsWithScores = 0;

        assignments.forEach((assignment: any) => {
            assignment.class.enrollments.forEach((enrollment: any) => {
                const sId = enrollment.student.id;

                // Calculate student stats
                const attendanceRate = enrollment.attendances.length > 0
                    ? (enrollment.attendances.filter((a: any) => a.status === 'PRESENT').length / enrollment.attendances.length) * 100
                    : 90 + Math.random() * 8 // Mock if no data

                const academicAvg = enrollment.scores.length > 0
                    ? enrollment.scores.reduce((sum: number, s: any) => sum + s.marks, 0) / enrollment.scores.length
                    : 80 + Math.random() * 10 // Mock if no data

                if (!allStudentsMap.has(sId)) {
                    allStudentsMap.set(sId, {
                        id: sId,
                        name: enrollment.student.user.name,
                        class: assignment.class.name,
                        attendance: parseFloat(attendanceRate.toFixed(1)),
                        participation: 85 + Math.random() * 10, // Mock
                        avgScore: parseFloat(academicAvg.toFixed(1)),
                        attendanceHistory: enrollment.attendances.map((a: any) => ({
                            date: a.date.toISOString().split('T')[0],
                            status: a.status.toLowerCase(),
                            participation: Math.floor(Math.random() * 3) + 3 // Mock
                        })),
                        scores: enrollment.scores.map((s: any) => ({
                            assessment: s.subject,
                            type: 'exam',
                            score: s.marks,
                            date: new Date().toISOString().split('T')[0]
                        }))
                    });

                    totalAttendanceSum += attendanceRate;
                    studentsWithAttendance++;
                    totalScoreSum += academicAvg;
                    studentsWithScores++;
                }
            });
        });

        const students = Array.from(allStudentsMap.values());
        students.sort((a: any, b: any) => b.avgScore - a.avgScore);

        const activeTerm = await prisma.term.findFirst({
            where: { isActive: true },
            include: { academicYear: true }
        })

        const stats = {
            avgAttendance: studentsWithAttendance > 0 ? parseFloat((totalAttendanceSum / studentsWithAttendance).toFixed(1)) : 92.5,
            participationRate: 88.3,
            avgScores: studentsWithScores > 0 ? parseFloat((totalScoreSum / studentsWithScores).toFixed(1)) : 84.7,
            totalStudents: students.length,
            activeSemester: activeTerm ? `${activeTerm.academicYear.year} - ${activeTerm.name}` : 'Fall 2025'
        }

        return NextResponse.json({
            teacher: {
                name: teacher.user.name,
                email: teacher.user.email,
                subject: teacher.subject || 'General',
                classes: assignments.map((a: any) => a.class.name)
            },
            stats,
            students
        })

    } catch (error) {
        console.error('Error fetching teacher stats:', error)
        return NextResponse.json({ error: 'Failed to fetch teacher stats' }, { status: 500 })
    }
}
