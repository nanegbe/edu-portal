import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const academicYears = await prisma.academicYear.findMany({
            include: {
                terms: true
            },
            orderBy: { year: 'desc' }
        })

        // Format for the frontend
        const formattedYears = academicYears.map((ay: any) => ({
            id: ay.id,
            year: ay.year,
            type: ay.type.toLowerCase(),
            status: ay.status.toLowerCase(),
            semesters: ay.terms.map((t: any) => ({
                id: t.id,
                name: t.name,
                startDate: t.startDate.toISOString().split('T')[0],
                endDate: t.endDate.toISOString().split('T')[0],
                status: t.status.toLowerCase(),
                isActive: t.status === 'ACTIVE'
            }))
        }))

        return NextResponse.json(formattedYears)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch academic calendar' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { year, type, terms } = data

        const result = await prisma.$transaction(async (tx: any) => {
            const academicYear = await tx.academicYear.create({
                data: {
                    year,
                    type: type.toUpperCase(),
                    status: 'UPCOMING'
                }
            })

            for (const term of terms) {
                await tx.term.create({
                    data: {
                        academicYearId: academicYear.id,
                        name: term.name,
                        startDate: new Date(term.startDate),
                        endDate: new Date(term.endDate),
                        status: 'UPCOMING'
                    }
                })
            }

            return academicYear
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error('Error creating academic year:', error)
        return NextResponse.json({ error: 'Failed to create academic year' }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const { status, type } = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        }

        if (type === 'year') {
            const updated = await prisma.academicYear.update({
                where: { id },
                data: { status: status.toUpperCase() }
            })
            return NextResponse.json(updated)
        } else if (type === 'term') {
            // If setting a term to ACTIVE, unset others
            if (status.toUpperCase() === 'ACTIVE') {
                await prisma.$transaction(async (tx: any) => {
                    await tx.term.updateMany({
                        data: { status: 'COMPLETED' },
                        where: { status: 'ACTIVE' }
                    })
                    await tx.term.update({
                        where: { id },
                        data: { status: 'ACTIVE' }
                    })
                })
            } else {
                await prisma.term.update({
                    where: { id },
                    data: { status: status.toUpperCase() }
                })
            }
            return NextResponse.json({ message: 'Term updated successfully' })
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update calendar' }, { status: 500 })
    }
}
