"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { getPortalData } from './actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrdersTable } from './OrdersTable'
import { InvoicesTable } from './InvoicesTable'
import { DocumentsTable } from './DocumentsTable'
import { RequestOrderDialog } from './RequestOrderDialog'
import { RequestDocumentDialog } from './RequestDocumentDialog'
import { PiSpinner } from 'react-icons/pi'

export default function PortalPage() {
    const searchParams = useSearchParams()
    const accessId = searchParams.get('accessId')
    const [portalData, setPortalData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchPortalData = async (accessId: string) => {
        try {
            const data = await getPortalData(accessId)
            setPortalData(data)
        } catch (error) {
            console.log('Error fetching portal data:', error)
            setError('Error fetching portal data')
        }
    }

    useEffect(() => {
        if (accessId) {
            fetchPortalData(accessId)
        }
    }, [accessId])

    if (!portalData && !error) {
        return <div className="flex justify-center items-center h-screen"><PiSpinner className="animate-spin text-2xl" /></div>
    }

    if (!portalData && error) {
        return <div className="flex justify-center items-center h-screen">Error: {error}</div>
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between gap-4 mt-5 mb-5">
                <h1 className="text-2xl font-bold mb-4">{portalData.project}'s Portal</h1>
                <h2 className="text-lg font-medium mb-4">Client: {portalData.client}</h2>
            </div>
            <Tabs defaultValue="orders">
                <TabsList>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <div className="flex justify-between items-center mt-5 mb-4">
                        <h2 className="text-xl font-semibold">Orders</h2>
                        <RequestOrderDialog 
                            clientId={portalData.id} 
                            onOrderRequested={() => accessId && fetchPortalData(accessId)} 
                        />
                    </div>
                    <OrdersTable orders={portalData.orders} />
                </TabsContent>
                <TabsContent value="invoices">
                    <h2 className="text-xl font-semibold mb-4 mt-5">Invoices</h2>
                    <InvoicesTable invoices={portalData.invoices} />
                </TabsContent>
                <TabsContent value="documents">
                    <div className="flex justify-between items-center mb-8 mt-5">
                        <h2 className="text-xl font-semibold">Documents</h2>
                        <RequestDocumentDialog clientId={portalData.id} />
                    </div>
                    <h3 className="text-lg font-medium mb-5">Your Requests</h3>
                    <DocumentsTable documents={portalData.requestedDocuments} canUpload={false} />
                    <h3 className="text-lg font-medium mt-8 mb-5">Requested from You</h3>
                    <DocumentsTable documents={portalData.documentsToUpload} canUpload={true} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
