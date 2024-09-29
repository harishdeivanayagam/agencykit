"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PiPlus } from 'react-icons/pi'

interface CreateInvoiceDialogProps {
    onCreateInvoice: (name: string) => Promise<void>
}

export function CreateInvoiceDialog({ onCreateInvoice }: CreateInvoiceDialogProps) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onCreateInvoice(name)
        setName('')
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='flex items-center gap-2'><PiPlus />Create Invoice</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder='Invoice Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <Button className='flex items-center gap-2' type="submit"><PiPlus />Create</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
