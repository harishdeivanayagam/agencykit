"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPortalData } from './actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrdersTable } from './OrdersTable'
import { InvoicesTable } from './InvoicesTable'
import { DocumentsTable } from './DocumentsTable'
import { RequestOrderDialog } from './RequestOrderDialog'
import { RequestDocumentDialog } from './RequestDocumentDialog'

export default function PortalPage() {
    const searchParams = useSearchParams()
    const accessId = searchParams.get('accessId')
    const [clientData, setClientData] = useState<any>(null)

    const fetchPortalData = async (accessId: string) => {
        try {
            const data = await getPortalData(accessId)
            setClientData(data)
        } catch (error) {
            console.log('Error fetching portal data:', error)
        }
    }

    useEffect(() => {
        if (accessId) {
            fetchPortalData(accessId)
        }
    }, [accessId])

    if (!clientData) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Client Portal</h1>
            <Tabs defaultValue="orders">
                <TabsList>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Orders</h2>
                        <RequestOrderDialog clientId={clientData.id} />
                    </div>
                    <OrdersTable orders={clientData.orders} />
                </TabsContent>
                <TabsContent value="invoices">
                    <h2 className="text-xl font-semibold mb-4 mt-5">Invoices</h2>
                    <InvoicesTable invoices={clientData.invoices} />
                </TabsContent>
                <TabsContent value="documents">
                    <div className="flex justify-between items-center my-8">
                        <h2 className="text-xl font-semibold">Documents</h2>
                        <RequestDocumentDialog clientId={clientData.id} />
                    </div>
                    <h3 className="text-lg font-medium mb-5">Your Requests</h3>
                    <DocumentsTable documents={clientData.requestedDocuments} canUpload={false} />
                    <h3 className="text-lg font-medium mt-8 mb-5">Requested from You</h3>
                    <DocumentsTable documents={clientData.documentsToUpload} canUpload={true} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
