import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const { teacherId, classNames } = await request.json()

        if (!teacherId || !classNames || !Array.isArray(classNames)) {
            return NextResponse.json({ error: 'Teacher ID and Class Names array are required' }, { status: 400 })
        }

        // Perform assignments in a transaction
        await prisma.$transaction(async (tx: any) => {
            // 1. Clear current assignments for this teacher
            await tx.classAssignment.deleteMany({
                where: { teacherId }
            })

            // 2. Assign the new classes
            for (const className of classNames) {
                // Find the class by name (using upsert or just find)
                // Since we seeded them, they should exist, but let's be safe
                let classRecord = await tx.class.findUnique({
                    where: { name: className }
                })

                if (!classRecord) {
                    classRecord = await tx.class.create({
                        data: { name: className }
                    })
                }

                // 3. Enforce "Each class can have one assigned teacher"
                // Delete any existing assignment for this class to other teachers
                await tx.classAssignment.deleteMany({
                    where: { classId: classRecord.id }
                })

                // 4. Create the new assignment
                await tx.classAssignment.create({
                    data: {
                        teacherId,
                        classId: classRecord.id
                    }
                })
            }
        })

        return NextResponse.json({ message: 'Classes assigned successfully' })

    } catch (error) {
        console.error('Error assigning classes:', error)
        return NextResponse.json({ error: 'Failed to assign classes' }, { status: 500 })
    }
}
