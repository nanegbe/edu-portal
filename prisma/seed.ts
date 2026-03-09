import prisma from '../src/lib/prisma'

async function main() {
    const classes = [
        'Grade 9A', 'Grade 9B',
        'Grade 10A', 'Grade 10B',
        'Grade 11A', 'Grade 11B',
        'Grade 12A', 'Grade 12B'
    ]

    console.log('Seeding classes...')

    for (const name of classes) {
        await prisma.class.upsert({
            where: { name },
            update: {},
            create: { name, level: name.includes('9') || name.includes('10') ? 'Junior' : 'Senior' }
        })
    }

    console.log('Seeding completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
