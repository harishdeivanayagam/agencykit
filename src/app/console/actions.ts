'use server'

import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/auth'

export async function fetchProjects() {
    const { organizationId } = getAuthToken()
    return await prisma.project.findMany({
        where: { organizationId },
        select: { id: true, name: true }
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
