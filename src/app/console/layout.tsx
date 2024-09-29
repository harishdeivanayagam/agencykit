'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PiShoppingCart, PiUsers, PiReceipt, PiGear, PiPlus, PiClipboard, PiPaperPlaneTilt } from 'react-icons/pi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ProjectProvider, useProject } from './ProjectContext'
import { AddProjectDialog } from './addProjectDialog'
import { useToast } from '@/hooks/use-toast'
import { sendPortalAccess } from './actions'


function ConsoleLayoutContent({ children }: { children: React.ReactNode }) {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const { projects, currentProject, setCurrentProject } = useProject()
  const pathname = usePathname()
  const { toast } = useToast()

  const routes = [
    { name: 'Orders', href: '/console/orders', icon: PiShoppingCart },
    { name: 'Clients', href: '/console/clients', icon: PiUsers },
    { name: 'Invoices', href: '/console/invoices', icon: PiReceipt },
    { name: 'Settings', href: '/console/settings', icon: PiGear },
  ]

  const handleCopyUrl = async () => {
    const project = projects.find(p => p.id === currentProject)
    if (project) {
      try {
        const portalUrl = `${window.location.origin}/portal?accessId=${project.accessId}`
        await navigator.clipboard.writeText(portalUrl)
        toast({
          title: 'Success',
          description: 'Portal URL copied to clipboard'
        })
      } catch (err) {
        toast({
          title: 'Failed',
          description: 'Failed to copy portal URL'
        })
      }
    } else {
      toast({
        title: 'Failed',
        description: 'Please select a project first',
      })
    }
  }

  const handleSendPortalAccess = async () => {
    if (currentProject) {
      try {
        await sendPortalAccess(currentProject, window.location.origin)
        toast({
          title: 'Success',
          description: 'Portal access sent successfully'
        })
      } catch (error) {
        toast({
          title: 'Failed',
          description: 'Failed to send portal access'
        })
      }
    } else {
      toast({
        title: 'Failed',
        description: 'Please select a project first'
      })
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r-[1px] border-gray-200 p-4">
        <div className="flex justify-between h-full flex-col">
          <div>
            <div className="mb-4">
              {projects.length > 0 ? (
                <Select value={currentProject} onValueChange={setCurrentProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-gray-500">No projects available</div>
              )}
            </div>
            <Button className="w-full mb-4 flex items-center justify-center gap-2" onClick={() => setIsAddProjectOpen(true)}>
              <PiPlus /> Add Project
            </Button>

            <nav>
              <ul>
                {routes.map((route) => (
                  <li key={route.href} className="mb-2">
                    <Link
                      href={route.href}
                      className={`flex items-center p-2 rounded ${pathname === route.href ? 'bg-gray-200' : 'hover:bg-gray-200'
                        }`}
                    >
                      <route.icon className="mr-2" />
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="w-full flex items-center justify-center gap-2" onClick={handleSendPortalAccess}>
              <PiPaperPlaneTilt /> Send Portal Access
            </Button>
            <Button className="w-full flex items-center justify-center gap-2" variant="outline" onClick={handleCopyUrl}>
              <PiClipboard /> Copy URL
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-auto">{children}</div>
      <AddProjectDialog isOpen={isAddProjectOpen} onClose={() => setIsAddProjectOpen(false)} />
    </div>
  )
}

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider>
      <ConsoleLayoutContent>{children}</ConsoleLayoutContent>
    </ProjectProvider>
  )
}