'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { addClient } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PiSpinner } from 'react-icons/pi'

interface AddClientDialogProps {
    isOpen: boolean
    onClose: () => void
    onClientAdded: () => void
}

interface ClientFormData {
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

export default function AddClientDialog({ isOpen, onClose, onClientAdded }: AddClientDialogProps) {
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const form = useForm<ClientFormData>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        }
    })

    const onSubmit = async (data: ClientFormData) => {
        setIsSubmitting(true)
        try {
            await addClient(data)
            form.reset()
            onClientAdded()
            onClose()
            setError(null)
        } catch (error) {
            console.error('Error adding client:', error)
            setError('Failed to add client. Please try again.')
            if (error instanceof Error && error.message.includes('Unauthorized')) {
                router.push('/auth/login')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Client</DialogTitle>
                    <DialogDescription>
                        Fill in the details to add a new client.
                    </DialogDescription>
                </DialogHeader>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {Object.keys(form.getValues()).map((key) => (
                            <FormField
                                key={key}
                                control={form.control}
                                name={key as keyof ClientFormData}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                                        <FormControl>
                                            <Input {...field} type={key === 'email' ? 'email' : 'text'} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <PiSpinner className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    'Add Client'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}