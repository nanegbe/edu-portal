import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const {
            // Student Info
            studentName, dateOfBirth, gender, placeOfBirth, nationality, address, studentId, studentPhoto,
            // Parent Info
            guardianName, relationship, guardianPhone, guardianEmail, guardianOccupation, guardianAddress,
            // Academic
            grade, previousSchool, lastClassCompleted, admissionDate,
            // Emergency
            emergencyContactName, emergencyRelationship, emergencyPhone,
            // Medical
            knownAllergies, medicalConditions, bloodGroup
        } = data

        // 1. Check if user/student exists
        const existingUser = await prisma.user.findUnique({
            where: { email: guardianEmail } // Using guardian email for now if student email not provided
        })

        // In a real app, we might create a specific student email or use guardian's.
        // For this MVP, let's create a student user with a placeholder email if personal is missing
        const studentEmail = `${studentId.toLowerCase()}@school.edu`

        const existingStudent = await prisma.student.findUnique({
            where: { studentId }
        })

        if (existingStudent) {
            return NextResponse.json({ error: 'Student ID already exists' }, { status: 400 })
        }

        // 2. Generate a default password for the student/parent portal
        const defaultPassword = await bcrypt.hash('student123', 10)

        // 3. Create everything in a transaction
        const result = await prisma.$transaction(async (tx: any) => {
            // Create User
            const user = await tx.user.create({
                data: {
                    name: studentName,
                    email: studentEmail,
                    password: defaultPassword,
                    role: 'STUDENT',
                }
            })

            // Create Student Profile
            const student = await tx.student.create({
                data: {
                    userId: user.id,
                    studentId,
                    dateOfBirth: new Date(dateOfBirth),
                    gender,
                    placeOfBirth,
                    nationality,
                    address,
                    photoUrl: studentPhoto, // URL after upload
                    previousSchool,
                    lastClassCompleted,
                    admissionDate: new Date(admissionDate),
                }
            })

            // Create Guardian
            await tx.guardian.create({
                data: {
                    name: guardianName,
                    relationship,
                    phone: guardianPhone,
                    email: guardianEmail,
                    occupation: guardianOccupation,
                    address: guardianAddress,
                    students: {
                        connect: { id: student.id }
                    }
                }
            })

            // Create Medical Info
            await tx.medicalInfo.create({
                data: {
                    studentId: student.id,
                    allergies: knownAllergies,
                    medicalConditions,
                    bloodGroup
                }
            })

            // Create Emergency Contact
            await tx.emergencyContact.create({
                data: {
                    studentId: student.id,
                    name: emergencyContactName,
                    relationship: emergencyRelationship,
                    phone: emergencyPhone
                }
            })

            // Create Enrollment
            // Find the class by name (grade)
            const classRecord = await tx.class.findUnique({
                where: { name: grade }
            })

            // Find active academic year
            const activeYear = await tx.academicYear.findFirst({
                where: { status: 'ACTIVE' }
            })

            if (classRecord && activeYear) {
                await tx.enrollment.create({
                    data: {
                        studentId: student.id,
                        classId: classRecord.id,
                        academicYearId: activeYear.id,
                        status: 'enrolled'
                    }
                })
            }

            return student
        })

        return NextResponse.json({ message: 'Student admitted successfully', studentId: result.studentId })

    } catch (error) {
        console.error('Error admitting student:', error)
        return NextResponse.json({ error: 'Failed to admit student' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const students = await prisma.student.findMany({
            include: {
                user: true,
                enrollments: {
                    include: {
                        class: true
                    }
                }
            }
        })
        return NextResponse.json(students)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
    }
}
