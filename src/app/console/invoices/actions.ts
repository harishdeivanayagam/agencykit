"use server"

import { getAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma'

export async function getInvoices(projectId: string) {

    const { organizationId } = getAuthToken();

    return prisma.invoice.findMany({
        where: {
            organizationId: organizationId,
            projectId: projectId
        },
        include: { client: true, project: true },
    })
}

export async function getInvoice(id: string) {

    const { organizationId } = getAuthToken();

    return prisma.invoice.findUnique({
        where: {
            id,
            organizationId
        },
        include: { client: true, project: true },
    })
}

export async function createInvoice(projectId: string, name: string) {
    const { organizationId } = getAuthToken();

    const project = await prisma.project.findUnique({
        where: { 
            id: projectId,
            organizationId
        },
    });

    if (!project) {
        throw new Error('Project not found');
    }

    const invoice = await prisma.invoice.create({
        data: {
            organizationId: project.organizationId,
            projectId: project.id,
            clientId: project.clientId,
            status: "DRAFT",
            name: name
        },
    });

    return invoice;
}

export async function updateInvoice(id: string, name: string, data: any) {

    const { organizationId } = getAuthToken();

    return prisma.invoice.update({
        where: { 
            id,
            organizationId
        },
        data: { name: name, data: data },
    })
}

export async function sendInvoice(id: string) {

    const { userId, organizationId } = getAuthToken();

    const invoice = await getInvoice(id)

    // Use FileForge API to generate PDF from HTML
    // const pdf = await fileforgeApi.generatePdf(html)

    // Send email with PDF attachment
    // await sendEmail(invoice.client.email, 'New Invoice', 'Please find the attached invoice.', pdf)

    return prisma.invoice.update({
        where: {
            id
        },
        data: {
            status: 'SENT'
        }
    })
}

export const deleteInvoice = async (id: string) => {
    try {
        const { organizationId } = getAuthToken();
        await prisma.invoice.delete({
            where: {
                id,
                organizationId
            }
        })

    } catch (error) {
        console.error('Error deleting invoice:', error);
        throw error;
    }
};
