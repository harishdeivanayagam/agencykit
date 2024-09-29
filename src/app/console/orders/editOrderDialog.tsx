'use client'

import { useEffect, useState, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateOrder } from './actions'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { PiSpinner } from 'react-icons/pi'
import { useProject } from '../ProjectContext'

interface EditOrderDialogProps {
  isOpen: boolean
  onClose: () => void
  onOrderUpdated: () => void
  order: any
}

export default function EditOrderDialog({ isOpen, onClose, onOrderUpdated, order }: EditOrderDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { currentProject } = useProject()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: order.name,
      description: order.description,
      status: order.status,
      dueDate: new Date(order.dueDate),
      priority: order.priority,
    }
  })

  useEffect(() => {
    reset({
      name: order.name,
      description: order.description,
      status: order.status,
      dueDate: new Date(order.dueDate),
      priority: order.priority,
    })
  }, [order, reset])

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await updateOrder(order.id, { ...data, projectId: currentProject })
      onOrderUpdated()
      onClose()
    } catch (error) {
      console.error('Error updating order:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <PiSpinner className="mr-2 h-4 w-4 animate-spin" /> : null}
              Update Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
