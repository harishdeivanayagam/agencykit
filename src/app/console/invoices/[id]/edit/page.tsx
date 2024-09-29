"use client"

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { updateInvoice, getInvoice } from '../../actions'
import { Label } from '@/components/ui/label'
import { PiFloppyDisk, PiPlus, PiTrash } from 'react-icons/pi'
import { useRouter } from 'next/navigation'

export default function EditInvoicePage({ params }: { params: { id: string } }) {
    const [lineItems, setLineItems] = useState<Array<{ description: string, quantity: number, price: number }>>([]);
    const router = useRouter()
    const [name, setName] = useState<string>('')

    useEffect(() => {
        fetchInvoice();
    }, [])

    const fetchInvoice = async () => {
        try {
            const data = await getInvoice(params.id)
            if (data) {
                setName(data.name)
                if (Array.isArray(data.data)) {
                    setLineItems(data.data as any[]);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateInvoice(params.id, name, lineItems)
        router.push(`/console/invoices`)
    }

    const handleInputChange = (index: number, field: 'description' | 'quantity' | 'price', value: string | number) => {
        const updatedLineItems = [...lineItems];
        updatedLineItems[index] = { ...updatedLineItems[index], [field]: value };
        setLineItems(updatedLineItems);
    }

    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 0, price: 0 }]);
    }

    const removeLineItem = (index: number) => {
        setLineItems(lineItems.filter((_, i) => i !== index));
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Edit Invoice</h1>
            <form onSubmit={onSubmit}>
                <div className="space-y-4 mb-6">
                    <Label>Invoice Number</Label>
                    <Input value={params.id} disabled placeholder="Invoice Number" />
                </div>
                <div className="space-y-4 mb-6">
                    <Label>Invoice Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Invoice Name" />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lineItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Input
                                        value={item.description}
                                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleInputChange(index, 'quantity', Number(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={item.price}
                                        onChange={(e) => handleInputChange(index, 'price', Number(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    {(item.quantity * item.price).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => removeLineItem(index)}
                                        className="p-2"
                                    >
                                        <PiTrash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button className='flex items-center gap-2 mt-5' type="button" onClick={addLineItem}>
                    <PiPlus className='mr-2' />
                    Add Line Item
                </Button>

                <div className="mt-6 flex justify-end text-right">
                    <Button className='flex items-center gap-2' type="submit"><PiFloppyDisk />Save</Button>
                </div>
            </form>
        </div>
    )
}
