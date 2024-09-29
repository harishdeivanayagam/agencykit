'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateClient, deleteClient } from './actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PiFloppyDisk, PiPen, PiTrash } from 'react-icons/pi'

interface Client {
    id: string
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

interface ClientsTableProps {
    clients: Client[]
    onClientUpdated: () => void
}

export default function ClientsTable({ clients, onClientUpdated }: ClientsTableProps) {
    const [editingClient, setEditingClient] = useState<Client | null>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleEdit = (client: Client) => {
        setEditingClient(client)
    }

    const handleSave = async () => {
        if (editingClient) {
            try {
                await updateClient(editingClient)
                setEditingClient(null)
                onClientUpdated()
                setError(null)
            } catch (error) {
                console.error('Error updating client:', error)
                setError('Failed to update client. Please try again.')
                if (error instanceof Error && error.message.includes('Unauthorized')) {
                    router.push('/auth/login')
                }
            }
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteClient(id)
            onClientUpdated()
            setError(null)
        } catch (error) {
            console.error('Error deleting client:', error)
            setError('Failed to delete client. Please try again.')
            if (error instanceof Error && error.message.includes('Unauthorized')) {
                router.push('/auth/login')
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Client) => {
        if (editingClient) {
            setEditingClient({ ...editingClient, [field]: e.target.value })
        }
    }

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Zip</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow key={client.id}>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.name}
                                        onChange={(e) => handleInputChange(e, 'name')}
                                    />
                                ) : (
                                    client.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.email}
                                        onChange={(e) => handleInputChange(e, 'email')}
                                    />
                                ) : (
                                    client.email
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.phone}
                                        onChange={(e) => handleInputChange(e, 'phone')}
                                    />
                                ) : (
                                    client.phone
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.website}
                                        onChange={(e) => handleInputChange(e, 'website')}
                                    />
                                ) : (
                                    client.website
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.address}
                                        onChange={(e) => handleInputChange(e, 'address')}
                                    />
                                ) : (
                                    client.address
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.city}
                                        onChange={(e) => handleInputChange(e, 'city')}
                                    />
                                ) : (
                                    client.city
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.state}
                                        onChange={(e) => handleInputChange(e, 'state')}
                                    />
                                ) : (
                                    client.state
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.zip}
                                        onChange={(e) => handleInputChange(e, 'zip')}
                                    />
                                ) : (
                                    client.zip
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Input
                                        value={editingClient.country}
                                        onChange={(e) => handleInputChange(e, 'country')}
                                    />
                                ) : (
                                    client.country
                                )}
                            </TableCell>
                            <TableCell>
                                {editingClient?.id === client.id ? (
                                    <Button className='flex items-center gap-2' onClick={handleSave}><PiFloppyDisk />Save</Button>
                                ) : (
                                    <div className='flex gap-2'>
                                        <Button onClick={() => handleEdit(client)} className="flex items-center gap-2"><PiPen /> Edit</Button>
                                        <Button onClick={() => handleDelete(client.id)} className='flex items-center gap-2' variant="destructive"><PiTrash /> Delete</Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}