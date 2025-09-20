
import { NextResponse } from 'next/server';

// This is the intake API for Zapier.
// It will receive data from various Zaps and process it.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // TODO: 
    // 1. Identify the source of the data (e.g., from request headers or body).
    // 2. Validate the incoming data against a schema.
    // 3. Check for duplicates to prevent re-processing.
    // 4. Save the data to the appropriate database table.
    // 5. Log the transaction in an audit trail.

    console.log('Received data from Zapier:', body);

    return NextResponse.json({ success: true, message: "Data received" });

  } catch (error) {
    console.error('Error processing Zapier webhook:', error);
    // In a real scenario, you might want to retry or send an alert.
    return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 });
  }
}

// Optional: A GET endpoint for Zapier to verify the endpoint is live during setup.
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
