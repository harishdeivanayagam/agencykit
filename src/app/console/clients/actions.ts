'use server'

import { prisma } from '@/lib/prisma'
import { getAuthToken } from '@/lib/auth'


export async function getClients() {
  const { organizationId } = getAuthToken()
  return await prisma.client.findMany({
    where: { organizationId }
  })
}

interface ClientInput {
  name: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

export async function addClient(clientData: ClientInput) {
  const { organizationId } = getAuthToken()
  return await prisma.client.create({
    data: { 
      ...clientData,
      organizationId,
    }
  })
}

export async function updateClient({ id, ...clientData }: ClientInput & { id: string }) {
  const { organizationId } = getAuthToken()
  return await prisma.client.update({
    where: { id, organizationId },
    data: clientData
  })
}

export async function deleteClient(id: string) {
  const { organizationId } = getAuthToken()
  return await prisma.client.delete({
    where: { id, organizationId }
  })
}
