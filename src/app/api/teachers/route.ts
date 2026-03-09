import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Simple random password generator
function generateRandomPassword(length: number = 10) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    let retVal = ""
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }
    return retVal
}

export async function POST(request: Request) {
    try {
        const { name, email, subject, status } = await request.json()

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 })
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
        }

        // Generate credentials
        const password = generateRandomPassword()
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create User and Teacher Profile in a transaction
        const result = await prisma.$transaction(async (tx: any) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: 'TEACHER',
                }
            })

            const teacher = await tx.teacher.create({
                data: {
                    userId: user.id,
                    subject,
                    status: status || 'active'
                }
            })

            return { user, teacher }
        })

        return NextResponse.json({
            message: 'Teacher created successfully',
            credentials: {
                email,
                password // We return the plain password once so the admin can give it to the teacher
            }
        })

    } catch (error) {
        console.error('Error creating teacher:', error)
        return NextResponse.json({ error: 'Failed to create teacher' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const teachers = await prisma.teacher.findMany({
            include: {
                user: true,
                classes: {
                    include: {
                        class: true
                    }
                }
            }
        })

        // Format for the frontend
        const formattedTeachers = teachers.map((t: any) => ({
            id: t.id,
            name: t.user.name,
            email: t.user.email,
            subject: t.subject,
            status: t.status,
            classes: t.classes.map((c: any) => c.class.name),
            courses: [] // Based on current logic, maybe these are just display
        }))

        return NextResponse.json(formattedTeachers)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 })
        }

        const teacher = await prisma.teacher.findUnique({
            where: { id }
        })

        if (!teacher) {
            return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
        }

        // Delete teacher and associated user in a transaction
        await prisma.$transaction(async (tx: any) => {
            await tx.teacher.delete({
                where: { id }
            })
            await tx.user.delete({
                where: { id: teacher.userId }
            })
        })

        return NextResponse.json({ message: 'Teacher deleted successfully' })
    } catch (error) {
        console.error('Error deleting teacher:', error)
        return NextResponse.json({ error: 'Failed to delete teacher' }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const { name, email, subject, status } = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 })
        }

        const teacher = await prisma.teacher.findUnique({
            where: { id }
        })

        if (!teacher) {
            return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
        }

        // Update teacher and associated user in a transaction
        const updatedTeacher = await prisma.$transaction(async (tx: any) => {
            if (name || email) {
                await tx.user.update({
                    where: { id: teacher.userId },
                    data: {
                        name: name || undefined,
                        email: email || undefined,
                    }
                })
            }

            return await tx.teacher.update({
                where: { id },
                data: {
                    subject: subject || undefined,
                    status: status || undefined,
                }
            })
        })

        return NextResponse.json({ message: 'Teacher updated successfully', teacher: updatedTeacher })
    } catch (error) {
        console.error('Error updating teacher:', error)
        return NextResponse.json({ error: 'Failed to update teacher' }, { status: 500 })
    }
}
