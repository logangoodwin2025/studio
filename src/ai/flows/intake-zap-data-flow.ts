
'use server';
/**
 * @fileOverview A Genkit flow for ingesting data from a Zapier webhook.
 * This flow validates the incoming data and persists it to the Data Log.
 *
 * - intakeZapData - The main function to process incoming Zap data.
 * - ZapDataInput - The Zod schema for validating the input.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { addZapierEntry } from '@/services/data-log-service';
import { DataLogEntry } from '@/lib/mock-data';

// Define the expected input schema from Zapier.
export const ZapDataInputSchema = z.object({
  metric: z.string().min(3, "Metric name is required."),
  value: z.string().min(1, "Metric value is required."),
  department: z.enum(["Financials", "Membership", "Sales & Marketing", "Operations"]),
  sourceApp: z.string().min(2, "Source application name is required (e.g., QuickBooks, Stripe)."),
  timestamp: z.string().datetime().optional().describe("ISO 8601 timestamp of the event."),
});

export type ZapDataInput = z.infer<typeof ZapDataInputSchema>;

export async function intakeZapData(input: ZapDataInput): Promise<DataLogEntry> {
  // Although the API route might have a try-catch, validating here ensures
  // that any call to this function is safe.
  const validationResult = ZapDataInputSchema.safeParse(input);
  if (!validationResult.success) {
    console.error("Invalid Zapier data received:", validationResult.error.flatten());
    throw new Error(`Invalid data structure from Zapier: ${validationResult.error.message}`);
  }
  
  return intakeZapDataFlow(validationResult.data);
}


const intakeZapDataFlow = ai.defineFlow(
  {
    name: 'intakeZapDataFlow',
    inputSchema: ZapDataInputSchema,
    outputSchema: z.custom<DataLogEntry>(),
  },
  async (input) => {
    // Here you could add more complex logic, like:
    // - Transforming the data
    // - Calling another AI model to categorize or analyze the data
    // - Checking for duplicates

    // For now, we will persist it directly using our service.
    const newEntry = addZapierEntry(input);
    
    console.log(`Successfully processed and saved data from ${input.sourceApp}. Entry ID: ${newEntry.id}`);

    return newEntry;
  }
);
