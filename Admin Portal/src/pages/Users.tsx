import { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from '@/features/users/hooks'
import type { UserRecord } from '@/features/users/api'

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useUsers({ page: 1, pageSize: 10, search })
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<UserRecord | null>(null)
  const [form, setForm] = useState<Omit<UserRecord, 'id'>>({ name: '', email: '', role: 'manager', status: 'active' })

  const columns = useMemo<ColumnDef<UserRecord>[]>(() => [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'status', header: 'Status' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => { setEditing(row.original); setForm({ name: row.original.name, email: row.original.email, role: row.original.role, status: row.original.status }); setOpen(true) }}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => deleteUser.mutate(row.original.id)}>Delete</Button>
        </div>
      )
    }
  ], [deleteUser])

  const onSubmit = async () => {
    if (editing) {
      await updateUser.mutateAsync({ id: editing.id, data: form })
    } else {
      await createUser.mutateAsync(form)
    }
    setOpen(false)
    setEditing(null)
    setForm({ name: '', email: '', role: 'manager', status: 'active' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-1">Manage team members and roles.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setForm({ name: '', email: '', role: 'manager', status: 'active' }) }}>New User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit User' : 'Create User'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as any })} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={onSubmit}>{editing ? 'Save' : 'Create'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-to-br from-card to-card/50 border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Users</span>
            <Input placeholder="Search users" className="max-w-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data?.items ?? []} total={data?.total} globalFilterPlaceholder="Filter users..." />
        </CardContent>
      </Card>
    </div>
  )
}


