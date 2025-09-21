

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export function PlatformIntegrationsSettings() {
    const { toast } = useToast();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to Clipboard",
            description: "The URL has been copied.",
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <img src="/logos/zapier.svg" alt="Zapier" className="h-8 w-8"/>
                        Zapier App Configuration
                    </CardTitle>
                    <CardDescription>
                        Manage the client ID and secret for the PinnSight Zapier application. These values are obtained from the Zapier developer platform.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="clientId">Client ID</Label>
                        <Input id="clientId" placeholder="Enter Zapier Client ID" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="clientSecret">Client Secret</Label>
                        <Input id="clientSecret" type="password" placeholder="Enter Zapier Client Secret" />
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                    <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Save Credentials
                    </Button>
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Webhook Endpoints</CardTitle>
                    <CardDescription>
                        Use these URLs in the Zapier developer platform to subscribe to REST Hooks for receiving data.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="webhookUrl">Zap Intake API URL</Label>
                        <div className="flex gap-2">
                            <Input id="webhookUrl" value="https://www.pinnsight.com/api/zapier" readOnly />
                             <Button variant="outline" size="icon" onClick={() => handleCopy("https://www.pinnsight.com/api/zapier")}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                         <p className="text-xs text-muted-foreground">
                            This endpoint receives all incoming data from active Zaps and must be configured with HMAC signature validation.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

    