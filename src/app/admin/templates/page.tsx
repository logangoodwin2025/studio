
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  industryTemplates,
  departmentOptions,
  allKpiOptions,
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
import { Edit, Package, PlusCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const templateSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Template name must be at least 3 characters."),
  defaultKpis: z.array(z.string()).min(1, "At least one KPI must be selected."),
});

type TemplateFormValues = z.infer<typeof templateSchema>;

export default function TemplatesPage() {
  const { toast } = useToast();
  const [templates, setTemplates] = React.useState(industryTemplates);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState<TemplateFormValues | null>(null);

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
  });

  const handleAddNew = () => {
    setEditingTemplate(null);
    form.reset({ id: `template_${Date.now()}`, name: "", defaultKpis: [] });
    setDialogOpen(true);
  };

  const handleEdit = (template: TemplateFormValues) => {
    setEditingTemplate(template);
    form.reset(template);
    setDialogOpen(true);
  };

  const onSubmit = (values: TemplateFormValues) => {
    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((t) => (t.id === values.id ? values : t))
      );
      toast({ title: "Template Updated", description: "The template has been successfully updated." });
    } else {
      setTemplates((prev) => [...prev, values]);
      toast({ title: "Template Created", description: "The new template has been successfully created." });
    }
    setDialogOpen(false);
  };
  
  const KpiSelectionForm = ({ control }: { control: any }) => (
     <ScrollArea className="h-96">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 p-4">
          {departmentOptions.map((dept) => (
            <div key={dept.id} className="space-y-3">
              <h3 className="font-semibold font-headline">{dept.label}</h3>
              <Separator />
              <FormField
                control={control}
                name="defaultKpis"
                render={({ field }) => (
                  <FormItem>
                    {allKpiOptions
                      .filter((kpi) => kpi.department === dept.id)
                      .map((kpi) => (
                        <FormField
                          key={kpi.id}
                          control={control}
                          name="defaultKpis"
                          render={({ field }) => (
                            <FormItem key={kpi.id} className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(kpi.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, kpi.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== kpi.id
                                                )
                                            )
                                        }}
                                    />
                                </FormControl>
                                <Label htmlFor={kpi.id} className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {kpi.label}
                                </Label>
                            </FormItem>
                          )}
                        />
                      ))}
                      <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
  )

  return (
    <>
      <DashboardHeader
        title="Industry Template Management"
        description="Create and configure templates for different tenant industries."
      >
        <Button onClick={handleAddNew}>
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
                   <CardDescription>{template.defaultKpis.length} KPIs configured</CardDescription>
                </div>
                <Button variant="outline" size="icon" onClick={() => handleEdit(template)}>
                    <Edit className="h-4 w-4"/>
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold">Enabled KPIs:</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-2 space-y-1 max-h-40 overflow-y-auto">
                    {template.defaultKpis.map(kpiId => {
                        const kpi = allKpiOptions.find(k => k.id === kpiId);
                        return <li key={kpiId}>{kpi ? kpi.label : kpiId}</li>
                    })}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl">
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>{editingTemplate ? "Edit Template" : "Create New Template"}</DialogTitle>
                <DialogDescription>
                  {editingTemplate
                    ? `Update the configuration for the "${editingTemplate.name}" template.`
                    : "Define a new industry template by selecting the default KPIs."}
                </DialogDescription>
              </DialogHeader>
                <div className="py-4 space-y-4">
                    <FormField
                        control={form.control}
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
                    <KpiSelectionForm control={form.control} />
                </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save Template</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
