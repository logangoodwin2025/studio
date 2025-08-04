
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function OperationsForm() {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="font-headline">Operations Department Data Entry</CardTitle>
                <CardDescription>
                    Enter project, time tracking, and headcount data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Operations form fields will go here.</p>
            </CardContent>
        </Card>
    );
}
