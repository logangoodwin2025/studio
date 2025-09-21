
import { NextResponse } from 'next/server';
import { intakeZapData } from '@/ai/flows/intake-zap-data-flow';

// This is the intake API for Zapier.
// It will receive data from various Zaps and process it.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Pass the raw body to the Genkit flow for validation and processing.
    const result = await intakeZapData(body);

    console.log('Processed data from Zapier:', result);

    return NextResponse.json({ success: true, message: "Data received and processed.", data: result });

  } catch (error: any) {
    console.error('Error processing Zapier webhook:', error);
    // In a real scenario, you might want to retry or send an alert.
    return NextResponse.json({ success: false, message: error.message || "Error processing request" }, { status: 500 });
  }
}

// Optional: A GET endpoint for Zapier to verify the endpoint is live during setup.
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
