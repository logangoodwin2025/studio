import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ratios = [
    { label: "Current Ratio", value: "2.4" },
    { label: "Quick Ratio", value: "1.8" },
    { label: "Debt-to-Equity", value: "0.35" },
    { label: "ROI", value: "18.5%", color: "text-green-600" },
    { label: "ROE", value: "22.3%", color: "text-green-600" },
    { label: "Gross Margin", value: "38.8%", color: "text-green-600" },
];

export function KeyRatios() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Key Ratios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ratios.map((ratio, index) => (
            <div key={ratio.label}>
                <div className="flex justify-between items-center text-sm">
                    <p className="text-muted-foreground">{ratio.label}</p>
                    <p className={`font-semibold ${ratio.color || 'text-foreground'}`}>{ratio.value}</p>
                </div>
                {index < ratios.length - 1 && <Separator className="mt-4"/>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
