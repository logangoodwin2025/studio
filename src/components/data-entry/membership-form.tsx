
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function MembershipForm() {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="font-headline">Membership & Customer Data Entry</CardTitle>
                <CardDescription>
                    Enter customer growth and feedback data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Membership form fields will go here.</p>
            </CardContent>
        </Card>
    );
}
