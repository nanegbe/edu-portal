import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const classes = await prisma.class.findMany({
            orderBy: { name: 'asc' }
        })
        return NextResponse.json(classes)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name, level } = await request.json()
        const newClass = await prisma.class.create({
            data: { name, level }
        })
        return NextResponse.json(newClass)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create class' }, { status: 500 })
    }
}
