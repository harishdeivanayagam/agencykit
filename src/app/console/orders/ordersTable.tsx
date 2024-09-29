'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PiPencil, PiTrash } from 'react-icons/pi'
import { deleteOrder } from './actions'
import EditOrderDialog from './editOrderDialog'

interface OrdersTableProps {
  orders: any[]
  onOrderUpdated: () => void
}

export default function OrdersTable({ orders, onOrderUpdated }: OrdersTableProps) {
  const [editingOrder, setEditingOrder] = useState<any | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      await deleteOrder(id)
      onOrderUpdated()
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{new Date(order.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>{order.priority}</TableCell>
              <TableCell>{order.project.name}</TableCell>
              <TableCell>{order.assignedTo.name}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => setEditingOrder(order)}>
                  <PiPencil />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(order.id)}>
                  <PiTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingOrder && (
        <EditOrderDialog
          isOpen={editingOrder}
          onClose={() => setEditingOrder(null)}
          onOrderUpdated={onOrderUpdated}
          order={editingOrder}
        />
      )}
    </>
  )
}
