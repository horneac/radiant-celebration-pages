import { useEffect, useState } from "react";
import { getRsvps, type RsvpResponse } from "@/lib/rsvp-storage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminResponses = () => {
  const [rsvps, setRsvps] = useState<RsvpResponse[]>([]);

  useEffect(() => {
    setRsvps(getRsvps());
  }, []);

  const attending = rsvps.filter((r) => r.attending === "yes");
  const declining = rsvps.filter((r) => r.attending === "no");
  const totalGuests = attending.reduce((sum, r) => sum + parseInt(r.guests || "0"), 0);
  const totalChildren = attending.reduce((sum, r) => sum + parseInt(r.childGuests || "0"), 0);

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-body text-sm tracking-wide uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-light mb-2">RSVP Responses</h1>
        <p className="font-body text-muted-foreground mb-8">Manage and view all wedding RSVP submissions.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total RSVPs", value: rsvps.length },
            { label: "Attending", value: attending.length },
            { label: "Total Guests", value: totalGuests },
            { label: "Children", value: totalChildren },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="font-display text-3xl">{stat.value}</p>
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {rsvps.length === 0 ? (
          <p className="font-body text-muted-foreground text-center py-16">No RSVP responses yet.</p>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Name</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Email</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Status</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Guests</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Children</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Dietary</TableHead>
                  <TableHead className="font-body text-xs tracking-widest uppercase">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvps.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-body font-medium">{r.name}</TableCell>
                    <TableCell className="font-body text-sm">{r.email}</TableCell>
                    <TableCell>
                      <Badge variant={r.attending === "yes" ? "default" : "secondary"} className={r.attending === "yes" ? "bg-accent text-accent-foreground" : ""}>
                        {r.attending === "yes" ? "Attending" : "Declined"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-body text-center">{r.guests}</TableCell>
                    <TableCell className="font-body text-center">{r.childGuests}</TableCell>
                    <TableCell className="font-body text-sm">{r.dietary || "—"}</TableCell>
                    <TableCell className="font-body text-sm max-w-[200px] truncate">{r.message || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/admin/register" className="font-body text-sm text-accent hover:underline tracking-wide">
            Go to Guest Registration →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminResponses;
