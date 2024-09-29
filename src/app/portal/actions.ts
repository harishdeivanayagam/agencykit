"use server"

import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email' // Assuming you have an email sending utility

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
        id: project.id,
        project: project.name,
        client: project.client.name,
        orders: project.orders,
        invoices: project.invoices.filter(i => i.status !== 'DRAFT'),
        requestedDocuments: project.documents.filter(d => d.requestor === 'CLIENT'),
        documentsToUpload: project.documents.filter(d => d.requestor === 'AGENCY'),
    }
}


export async function requestOrder(accessId: string, data: any) {
    const project = await prisma.project.findUnique({
        where: { accessId },
    })

    if (!project) {
        throw new Error('Client not found')
    }

    const member = await prisma.member.findFirstOrThrow({
        where: {
            organizationId: project.organizationId,
        }
    })

    await prisma.order.create({
        data: {
            organizationId: project.organizationId,
            name: data.name,
            description: data.description,
            status: 'PENDING',
            dueDate: data.dueDate,
            assignedToId: member.userId,
            projectId: project.id,
            priority: data.priority,
        },
    })

    return

}