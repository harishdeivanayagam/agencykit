"use server"

import { prisma } from '@/lib/prisma'

export async function getPortalData(accessId: string) {
    const project = await prisma.project.findUnique({
        where: { accessId },
        include: {
            client: true,
            invoices: true,
            orders: true,
            documents: true
        }
    })

    if (!project) {
        throw new Error('Client not found')
    }

    return {
        id: project.client.id,
        name: project.client.name,
        orders: project.orders,
        invoices: project.invoices,
        requestedDocuments: project.documents.filter(d => d.requestor === 'CLIENT'),
        documentsToUpload: project.documents.filter(d => d.requestor === 'AGENCY'),
    }
}
