
/**
 * @fileOverview A service for interacting with the Data Log.
 * In a real application, this would interact with a database. For this
 * prototype, it will modify the in-memory mock data array.
 */

import { dataLogEntries, type DataLogEntry } from "@/lib/mock-data";
import { type ZapDataInput } from "@/ai/flows/intake-zap-data-flow";

/**
 * Adds a new entry to the data log from a Zapier input.
 * @param zapInput The validated data from the Zapier flow.
 * @returns The newly created DataLogEntry.
 */
export function addZapierEntry(zapInput: ZapDataInput): DataLogEntry {
  const newEntry: DataLogEntry = {
    id: `log_${Date.now()}`,
    metric: zapInput.metric,
    value: zapInput.value,
    date: zapInput.timestamp ? new Date(zapInput.timestamp) : new Date(),
    source: "Zapier",
    user: zapInput.sourceApp, // We'll use the sourceApp as the "user" for system entries
    department: zapInput.department,
  };

  // Prepend to the array to show it at the top of the log
  dataLogEntries.unshift(newEntry);

  return newEntry;
}
