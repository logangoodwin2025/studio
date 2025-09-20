
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  industryTemplates,
  departmentOptions,
  type IndustryTemplate,
  type Kpi,
} from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Edit, Package, PlusCircle, Settings, Trash2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const kpiSchema = z.object({
  id: z.string(),
  label: z.string().min(3, "KPI name must be at least 3 characters."),
  department: z.string().min(1, "Department is required."),
  description: z.string().min(3, "Description is required."),
  formula: z.string().optional(),
});

type KpiFormValues = z.infer<typeof kpiSchema>;


const templateSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Template name must be at least 3 characters."),
  kpis: z.array(z.string()).min(1, "At least one KPI must be selected."),
});

type TemplateFormValues = z.infer<typeof templateSchema>;

export default function TemplatesPage() {
  const { toast } = useToast();
  const [templates, setTemplates] = React.useState<IndustryTemplate[]>(industryTemplates);
  const [isTemplateDialogOpen, setTemplateDialogOpen] = React.useState(false);
  const [isKpiManagerOpen, setKpiManagerOpen] = React.useState(false);
  const [isKpiFormOpen, setKpiFormOpen] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState<IndustryTemplate | null>(null);
  const [editingKpi, setEditingKpi] = React.useState<Kpi | null>(null);


  const templateForm = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
  });

  const kpiForm = useForm<KpiFormValues>({
    resolver: zodResolver(kpiSchema)
  });

  const handleAddNewTemplate = () => {
    setEditingTemplate(null);
    templateForm.reset({ id: `template_${Date.now()}`, name: "", kpis: [] });
    setTemplateDialogOpen(true);
  };

  const handleEditTemplate = (template: IndustryTemplate) => {
    setEditingTemplate(template);
    templateForm.reset({
      id: template.id,
      name: template.name,
      kpis: template.kpis.map(k => k.id)
    });
    setTemplateDialogOpen(true);
  };

  const handleManageKpis = (template: IndustryTemplate) => {
    setEditingTemplate(template);
    setKpiManagerOpen(true);
  }

  const handleAddNewKpi = () => {
    setEditingKpi(null);
    kpiForm.reset({ id: `kpi_${Date.now()}`, label: "", department: "", description: "", formula: "" });
    setKpiFormOpen(true);
  }
  
  const handleEditKpi = (kpi: Kpi) => {
    setEditingKpi(kpi);
    kpiForm.reset(kpi);
    setKpiFormOpen(true);
  }

  const handleDeleteKpi = (kpiId: string) => {
    if (!editingTemplate) return;
    const updatedKpis = editingTemplate.kpis.filter(k => k.id !== kpiId);
    const updatedTemplate = { ...editingTemplate, kpis: updatedKpis };

    setEditingTemplate(updatedTemplate);
    setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
    toast({ title: "KPI Deleted", description: "The KPI has been removed from this template." });
  }

  const onTemplateSubmit = (values: TemplateFormValues) => {
    // This function is now mostly for renaming the template.
    // KPI association happens inside the checkbox form.
    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((t) => (t.id === values.id ? { ...t, name: values.name } : t))
      );
      toast({ title: "Template Updated", description: "The template has been successfully updated." });
    } else {
      const newTemplate: IndustryTemplate = {
        id: values.id,
        name: values.name,
        kpis: [], // KPIs are now managed separately
      }
      setTemplates((prev) => [...prev, newTemplate]);
      toast({ title: "Template Created", description: "The new template has been successfully created." });
    }
    setTemplateDialogOpen(false);
  };
  
  const onKpiSubmit = (values: KpiFormValues) => {
    if (!editingTemplate) return;

    let updatedKpis: Kpi[];
    if (editingKpi) { // We are editing an existing KPI
      updatedKpis = editingTemplate.kpis.map(k => k.id === editingKpi.id ? values : k);
      toast({ title: "KPI Updated", description: "The KPI has been successfully updated." });
    } else { // We are adding a new KPI
      updatedKpis = [...editingTemplate.kpis, values];
      toast({ title: "KPI Added", description: "The new KPI has been added to the template." });
    }
    
    const updatedTemplate = { ...editingTemplate, kpis: updatedKpis };
    setEditingTemplate(updatedTemplate);
    setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
    setKpiFormOpen(false);
  }


  return (
    <>
      <DashboardHeader
        title="Industry Template Management"
        description="Create and configure templates for different tenant industries."
      >
        <Button onClick={handleAddNewTemplate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Template
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                   <CardTitle className="font-headline flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> {template.name}</CardTitle>
                   <CardDescription>{template.kpis.length} KPIs configured</CardDescription>
                </div>
                 <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditTemplate(template)}>
                        <Edit className="h-4 w-4"/>
                    </Button>
                     <Button variant="outline" size="icon" onClick={() => handleManageKpis(template)}>
                        <Settings className="h-4 w-4"/>
                    </Button>
                 </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold">Enabled KPIs:</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-2 space-y-1 max-h-40 overflow-y-auto">
                    {template.kpis.map(kpi => {
                        return <li key={kpi.id}>{kpi.label}</li>
                    })}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Dialog for Renaming a Template */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent>
           <Form {...templateForm}>
            <form onSubmit={templateForm.handleSubmit(onTemplateSubmit)}>
              <DialogHeader>
                <DialogTitle>{editingTemplate ? "Edit Template Name" : "Create New Template"}</DialogTitle>
              </DialogHeader>
                <div className="py-4 space-y-4">
                    <FormField
                        control={templateForm.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Template Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Healthcare" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for Managing KPIs */}
      <Dialog open={isKpiManagerOpen} onOpenChange={setKpiManagerOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Manage KPIs for "{editingTemplate?.name}"</DialogTitle>
              <DialogDescription>
                Add, edit, or delete the Key Performance Indicators available in this template.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
                <Button onClick={handleAddNewKpi}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add New KPI
                </Button>
            </div>
            <div className="flex-grow overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>KPI Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Formula</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editingTemplate?.kpis.map(kpi => (
                      <TableRow key={kpi.id}>
                        <TableCell className="font-medium">{kpi.label}</TableCell>
                        <TableCell>{kpi.department}</TableCell>
                        <TableCell>{kpi.description}</TableCell>
                        <TableCell className="font-mono text-xs">{kpi.formula}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEditKpi(kpi)}>Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteKpi(kpi.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
             <DialogFooter>
                <DialogClose asChild>
                  <Button type="button">Done</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Adding/Editing a single KPI */}
      <Dialog open={isKpiFormOpen} onOpenChange={setKpiFormOpen}>
        <DialogContent>
            <Form {...kpiForm}>
              <form onSubmit={kpiForm.handleSubmit(onKpiSubmit)}>
                <DialogHeader>
                  <DialogTitle>{editingKpi ? "Edit KPI" : "Add New KPI"}</DialogTitle>
                </DialogHeader>
                 <div className="py-4 space-y-4">
                    <FormField control={kpiForm.control} name="label" render={({ field }) => ( <FormItem><FormLabel>KPI Name</FormLabel><FormControl><Input placeholder="e.g., Monthly Recurring Revenue" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={kpiForm.control} name="department" render={({ field }) => ( <FormItem><FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a department" /></SelectTrigger></FormControl>
                            <SelectContent>
                                {departmentOptions.map(opt => <SelectItem key={opt.id} value={opt.label}>{opt.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    <FormMessage /></FormItem> )} />
                    <FormField control={kpiForm.control} name="description" render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe the KPI" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={kpiForm.control} name="formula" render={({ field }) => ( <FormItem><FormLabel>Formula</FormLabel><FormControl><Input placeholder="e.g., SUM(Subscriptions)" {...field} /></FormControl><FormMessage /></FormItem> )} />
                 </div>
                <DialogFooter>
                  <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                  <Button type="submit">Save KPI</Button>
                </DialogFooter>
              </form>
            </Form>
        </DialogContent>
      </Dialog>

    </>
  );
}

    