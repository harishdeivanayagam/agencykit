"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RequestOrderDialog({ clientId }: { clientId: string }) {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Implement order request logic here
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Request Order</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request New Order</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="description">Order Description</Label>
                    <Input id="description" placeholder="Enter order details" />
                    <Button type="submit" className="mt-4">Submit Request</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
