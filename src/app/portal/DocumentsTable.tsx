import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function DocumentsTable({ documents, canUpload = false }: { documents: any[], canUpload: boolean }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Date Requested</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {documents.map((document) => (
                    <TableRow key={document.id}>
                        <TableCell>{document.name}</TableCell>
                        <TableCell>{new Date(document.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{document.status}</TableCell>
                        <TableCell>
                            {canUpload && document.status !== 'UPLOADED' ? (
                                <Button>Upload</Button>
                            ) : (
                                <Button>Download</Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}