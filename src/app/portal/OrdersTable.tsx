import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function OrdersTable({ orders }: { orders: any[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{order.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}