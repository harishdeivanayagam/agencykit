"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getInvoices, deleteInvoice, createInvoice } from './actions';
import { useProject } from '../ProjectContext';
import { CreateInvoiceDialog } from './CreateInvoiceDialog';

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Array<any>>([]);
    const router = useRouter();
    const { currentProject } = useProject();

    useEffect(() => {
        if (currentProject) {
            fetchInvoices();
        }
    }, [currentProject]);

    const fetchInvoices = async () => {
        try {
            const data = await getInvoices(currentProject);
            console.log(data)
            setInvoices(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateInvoice = async (name: string) => {
        try {
            await createInvoice(currentProject, name);
            fetchInvoices();
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this invoice?')) {
            try {
                await deleteInvoice(id);
                setInvoices(invoices.filter(invoice => invoice.id !== id));
            } catch (err) {
                console.log(err);
            }
        }
    };


    if (!currentProject) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-semibold mb-4">No Projects Found</h2>
                <p className="text-gray-600 mb-4">Create a project to start adding orders.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <div className='flex justify-between items-center my-3'>
                <h1 className="text-3xl font-bold mb-6">Invoices</h1>
                <CreateInvoiceDialog onCreateInvoice={handleCreateInvoice} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.name}</TableCell>
                            <TableCell>{invoice.project.name}</TableCell>
                            <TableCell>{invoice.client.name}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell className='flex gap-2'>
                                <Button onClick={() => router.push(`/console/invoices/${invoice.id}/edit`)}>Edit</Button>
                                <Button variant="destructive" onClick={() => handleDelete(invoice.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {invoices.length === 0 && <TableRow><TableCell colSpan={6}>No invoices found</TableCell></TableRow>}
                </TableBody>
            </Table>
        </div>
    );
}
