'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getOrders, getProjects } from './actions'
import { Button } from '@/components/ui/button'
import { PiPlus } from 'react-icons/pi'
import AddOrderDialog from './addOrderDialog'
import OrdersTable from './ordersTable'
import { useProject } from '../ProjectContext'

export default function OrdersPage() {
    const [orders, setOrders] = useState<Array<any>>([])
    const { currentProject } = useProject()
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (currentProject) {
            fetchOrders()
        }
    }, [currentProject])

    const fetchOrders = async () => {
        try {
            const fetchedOrders = await getOrders(currentProject)
            setOrders(fetchedOrders)
            setError(null)
        } catch (error) {
            console.error('Error fetching orders:', error)
            setError('Failed to fetch orders. Please try again.')
            if (error instanceof Error && error.message.includes('Unauthorized')) {
                router.push('/auth/login')
            }
        }
    }

    if (!currentProject) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-semibold mb-4">No Projects Found</h2>
                <p className="text-gray-600 mb-4">Create a project to start adding orders.</p>
            </div>
        )
    }

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <div className='flex justify-between items-center my-3'>
                <h1 className='text-lg font-semibold'>Orders</h1>
                <Button className='flex items-center gap-2' onClick={() => setIsAddDialogOpen(true)}><PiPlus /> Add</Button>
            </div>
            <OrdersTable orders={orders} onOrderUpdated={fetchOrders} />
            <AddOrderDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onOrderAdded={fetchOrders}
            />
        </div>
    )
}
