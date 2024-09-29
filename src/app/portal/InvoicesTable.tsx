import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function InvoicesTable({ invoices }: { invoices: any[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}