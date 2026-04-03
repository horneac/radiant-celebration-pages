import { useState } from "react";
import { addGuest, getGuests, getInviteLink, type Guest } from "@/lib/rsvp-storage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ArrowLeft, Copy, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AdminRegister = () => {
  const [guests, setGuests] = useState<Guest[]>(getGuests());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a name.");
      return;
    }
    const guest = addGuest(name.trim(), email.trim());
    setGuests(getGuests());
    setName("");
    setEmail("");
    toast.success(`Invite link created for ${guest.name}`);
  };

  const copyLink = (token: string) => {
    navigator.clipboard.writeText(getInviteLink(token));
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-body text-sm tracking-wide uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Register Guests</h1>
        <p className="font-body text-muted-foreground mb-8">Add guests and generate unique invitation links.</p>

        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 mb-10 bg-card border border-border rounded-lg p-6">
          <div className="flex-1">
            <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-1 block">Name *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Guest name" className="bg-background border-border font-body" />
          </div>
          <div className="flex-1">
            <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-1 block">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="guest@email.com" type="email" className="bg-background border-border font-body" />
          </div>
          <div className="flex items-end">
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body tracking-widest uppercase text-sm px-6">
              <LinkIcon className="w-4 h-4 mr-2" /> Create Link
            </Button>
          </div>
        </form>

        {guests.length === 0 ? (
          <p className="font-body text-muted-foreground text-center py-16">No guests registered yet.</p>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Name</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Email</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Token</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Invite Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell className="font-body font-medium">{g.name}</TableCell>
                    <TableCell className="font-body text-sm">{g.email || "—"}</TableCell>
                    <TableCell className="font-body text-sm font-mono text-muted-foreground">{g.token}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => copyLink(g.token)} className="font-body text-xs gap-1">
                        <Copy className="w-3 h-3" /> Copy Link
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/admin/responses" className="font-body text-sm text-accent hover:underline tracking-wide">
            ← View RSVP Responses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
