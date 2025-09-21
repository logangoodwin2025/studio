
"use client";

import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { OperationsForm } from "@/components/data-entry/operations-form";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileCheck2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRangePicker } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type UploadState = "idle" | "uploading" | "success" | "error";

export default function OperationsDataEntryPage() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [uploadState, setUploadState] = React.useState<UploadState>("idle");
  const [progress, setProgress] = React.useState(0);
  const [fileName, setFileName] = React.useState("");

  const handleActionClick = (action: "Download") => {
    toast({
      title: `${action} Initiated`,
      description: `The template ${action.toLowerCase()} process has started.`,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadState("idle");
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!fileName) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }
    setUploadState("uploading");
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 200);

    // Simulate network delay and validation
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      if (fileName.includes("error")) {
        setUploadState("error");
      } else {
        setUploadState("success");
      }
    }, 2000);
  };

  const resetUpload = () => {
    setFileName("");
    setUploadState("idle");
    setProgress(0);
  };

  return (
    <>
      <DashboardHeader
        title="Operations Data Entry"
        description="Input operational metrics and KPIs for a specific period"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <DateRangePicker date={dateRange} onDateChange={setDateRange} className="w-full sm:w-auto" />
            <div className="flex items-center gap-2 w-full sm:w-auto border p-1 rounded-lg">
              <Button variant="outline" onClick={() => handleActionClick("Download")} className="flex-1 sm:flex-initial text-xs">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
               <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetUpload(); }}>
                <DialogTrigger asChild>
                  <Button className="flex-1 sm:flex-initial text-xs">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Operations Data</DialogTitle>
                    <DialogDescription>
                      Upload a CSV or Excel file. Data will be validated against the canonical model before import.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {uploadState === "idle" && (
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="file">Select File</Label>
                        <Input id="file" type="file" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        {fileName && <p className="text-sm text-muted-foreground mt-2">Selected: {fileName}</p>}
                      </div>
                    )}
                    {uploadState === "uploading" && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Uploading and validating...</p>
                        <Progress value={progress} />
                        <p className="text-sm text-muted-foreground">{fileName}</p>
                      </div>
                    )}
                    {uploadState === "success" && (
                       <Alert variant="default" className="border-green-500">
                         <FileCheck2 className="h-4 w-4" color="hsl(var(--primary))" />
                         <AlertTitle className="text-green-700">Validation Successful!</AlertTitle>
                         <AlertDescription>
                           All rows have been successfully validated and imported.
                         </AlertDescription>
                       </Alert>
                    )}
                    {uploadState === "error" && (
                       <Alert variant="destructive">
                         <AlertTriangle className="h-4 w-4" />
                         <AlertTitle>Validation Failed</AlertTitle>
                         <AlertDescription>
                           <p>Errors found in your file. Please correct them and try again.</p>
                         </AlertDescription>
                       </Alert>
                    )}
                  </div>
                  <DialogFooter>
                    {uploadState === 'idle' && <Button onClick={handleUpload}>Upload File</Button>}
                    {(uploadState === 'success' || uploadState === 'error') && <Button onClick={resetUpload}>Upload Another File</Button>}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
        </div>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="mx-auto max-w-7xl">
            <OperationsForm />
        </div>
      </main>
    </>
  );
}
