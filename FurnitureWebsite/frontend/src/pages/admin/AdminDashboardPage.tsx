import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, Images, Mail, Star } from "lucide-react";

const STATS = [
  { label: "Total Products", value: "—", icon: Package },
  { label: "Gallery Images", value: "—", icon: Images },
  { label: "New Enquiries", value: "—", icon: Mail },
  { label: "Google Rating", value: "5.0", icon: Star },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Live stats will populate once the backend API is connected.
      </p>
    </div>
  );
}
