'use server'

import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/auth'
import { sendEmail } from '@/lib/email'

export async function fetchProjects() {
    const { organizationId } = getAuthToken()
    return await prisma.project.findMany({
        where: { organizationId },
        select: { id: true, name: true, accessId: true }
    })
}

export async function addProject({ name, clientId }: { name: string; clientId: string }) {
    const { organizationId } = getAuthToken()
    return await prisma.project.create({
        data: {
            name,
            clientId,
            organizationId,
        }
    })
}

export async function fetchClients() {
    const { organizationId } = getAuthToken()
    return await prisma.client.findMany({
        where: { organizationId },
        select: { id: true, name: true }
    })
}


export async function sendPortalAccess(projectId: string, host: string) {

    const { organizationId } = getAuthToken()


    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
            organizationId
        },
        include: { client: true },
    })

    if (!project || !project.client) {
        throw new Error('Project or client not found')
    }

    const portalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portal/${projectId}`

    await sendEmail(
        project.client.email,
        'Access to Your Project Portal',
        `<p>Hello ${project.client.name},</p><p>You can access your project portal at: <a href="${host}/portal?accessId=${project.accessId}">${host}/portal?accessId=${project.accessId}</a></p><p>Best regards,<br>Your Project Team</p>`,
    )
}
