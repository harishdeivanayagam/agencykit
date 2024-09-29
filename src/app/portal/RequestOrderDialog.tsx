"use client"

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { PiSpinner } from 'react-icons/pi'
import { requestOrder } from './actions'

type FormData = {
    name: string
    description: string
    status: string
    dueDate: Date
    priority: string
}

interface RequestOrderDialogProps {
    clientId: string
    onOrderRequested: () => void
}

export function RequestOrderDialog({ clientId, onOrderRequested }: RequestOrderDialogProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            name: '',
            description: '',
            status: 'PENDING',
            dueDate: new Date(),
            priority: 'MEDIUM',
        }
    })

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        try {
            await requestOrder(clientId, data)
            reset()
            setOpen(false)
            onOrderRequested()
        } catch (error) {
            console.error('Error requesting order:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button">Request Order</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request New Order</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Order Name is required' }}
                        render={({ field }) => (
                            <Input placeholder="Order Name" {...field} />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'Description is required' }}
                        render={({ field }) => (
                            <Input placeholder="Description" {...field} />
                        )}
                    />
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: 'Status is required' }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="SUBMITTED">Submitted</SelectItem>
                                    <SelectItem value="WORKING">Working</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <Controller
                        name="dueDate"
                        control={control}
                        rules={{ required: 'Due Date is required' }}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    <Controller
                        name="priority"
                        control={control}
                        rules={{ required: 'Priority is required' }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <PiSpinner className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Request Order
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
