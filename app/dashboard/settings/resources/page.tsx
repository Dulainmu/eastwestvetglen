"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createResource, deleteResource, getResources } from "@/lib/resource-actions"
import { Resource, ResourceType } from "@prisma/client"
import { Trash2, Plus } from "lucide-react"

export default function ResourcesPage({ params }: { params: { clinicSlug: string } }) {
    const [resources, setResources] = useState<Resource[]>([])
    const [newResourceName, setNewResourceName] = useState("")
    const [newResourceType, setNewResourceType] = useState<ResourceType>("ROOM")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadResources()
    }, [])

    async function loadResources() {
        const data = await getResources("vetflow-demo") // Hardcoded slug for now, should come from context/params
        setResources(data)
        setLoading(false)
    }

    async function handleAdd() {
        if (!newResourceName) return
        await createResource("vetflow-demo", { name: newResourceName, type: newResourceType })
        setNewResourceName("")
        loadResources()
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure?")) {
            await deleteResource(id)
            loadResources()
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Resources</h1>
                <p className="text-gray-500">Manage rooms and equipment for scheduling.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                <div className="flex gap-4">
                    <Input
                        placeholder="Resource Name (e.g. Surgery Room 1)"
                        value={newResourceName}
                        onChange={(e) => setNewResourceName(e.target.value)}
                    />
                    <Select value={newResourceType} onValueChange={(v) => setNewResourceType(v as ResourceType)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ROOM">Room</SelectItem>
                            <SelectItem value="EQUIPMENT">Equipment</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleAdd} disabled={!newResourceName}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                    </Button>
                </div>

                <div className="space-y-2">
                    {loading ? <p>Loading...</p> : resources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                    {resource.type}
                                </span>
                                <span className="font-medium">{resource.name}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(resource.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {!loading && resources.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No resources added yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
