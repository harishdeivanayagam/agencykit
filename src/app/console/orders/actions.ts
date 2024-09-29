'use server'

import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/auth'

export async function getOrders(projectId: string) {
    const { userId, organizationId } = getAuthToken()

    return prisma.order.findMany({
        where: {
            organizationId,
            projectId,
        },
        include: {
            project: true,
            assignedTo: true,
        },
    })
}

export async function createOrder(data: any) {
    const { userId, organizationId } = getAuthToken()

    return prisma.order.create({
        data: {
            ...data,
            organizationId,
            assignedToId: userId,
            projectId: data.projectId, // Ensure this is being used
        },
    })
}

export async function updateOrder(id: string, data: any) {
    const { userId, organizationId } = getAuthToken()

    return prisma.order.update({
        where: {
            id,
            organizationId,
            projectId: data.projectId, // Ensure this is being used
        },
        data: {
            ...data,
            projectId: data.projectId, // Ensure this is being updated
        },
    })
}

export async function deleteOrder(id: string) {
    const { userId, organizationId } = getAuthToken()

    return prisma.order.delete({
        where: {
            id,
            organizationId,
            project: {
                organization: {
                    members: {
                        some: {
                            userId,
                        },
                    },
                },
            },
        },
    })
}

export async function getProjects() {
    const { userId, organizationId } = getAuthToken()

    return prisma.project.findMany({
        where: {
            organizationId,
            organization: {
                members: {
                    some: {
                        userId,
                    },
                },
            },
        },
    })
}
