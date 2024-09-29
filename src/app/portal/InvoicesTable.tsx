import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function InvoicesTable({ invoices }: { invoices: any[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>${Array.isArray(invoice.data) ? invoice.data.reduce((sum: number, item: { price: number }) => sum + item.price, 0).toFixed(2) : 0}</TableCell>
                        <TableCell>
                            <Button disabled={invoice.status !== 'PAID'}>Pay Now</Button>
                            <Button variant="outline">Download</Button>
                        </TableCell>
                    </TableRow>
                ))}
                {invoices.length === 0 && <TableRow><TableCell colSpan={5}>No invoices found</TableCell></TableRow>}
            </TableBody>
        </Table>
    )
}
