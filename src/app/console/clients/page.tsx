'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getClients } from './actions'
import ClientsTable from './clientsTable'
import { Button } from '@/components/ui/button'
import { PiPlus } from 'react-icons/pi'
import AddClientDialog from './addClientDrawer'

export default function ClientsPage() {
    const [clients, setClients] = useState<Array<any>>([])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        try {
            const fetchedClients = await getClients()
            setClients(fetchedClients)
            setError(null)
        } catch (error) {
            console.error('Error fetching clients:', error)
            setError('Failed to fetch clients. Please try again.')
            if (error instanceof Error && error.message.includes('Unauthorized')) {
                router.push('/auth/login')
            }
        }
    }

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <div className='flex justify-between items-center my-3'>
                <h1 className='text-lg font-semibold'>Clients</h1>
                <Button className='flex items-center gap-2' onClick={() => setIsAddDialogOpen(true)}><PiPlus /> Add</Button>
            </div>
            <ClientsTable clients={clients} onClientUpdated={fetchClients} />
            <AddClientDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onClientAdded={fetchClients}
            />
        </div>
    )
}
