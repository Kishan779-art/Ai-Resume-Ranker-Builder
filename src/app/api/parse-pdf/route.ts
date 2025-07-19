
import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Invalid file type. Please upload a PDF.' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const data = await pdf(fileBuffer);
    
    if (!data.text) {
        return NextResponse.json({ error: 'Could not extract text from this PDF. It might be an image-only PDF.' }, { status: 500 });
    }
    
    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error('PDF parsing error:', error);
    let errorMessage = 'An unexpected error occurred while parsing the PDF.';
    if (error instanceof Error) {
        errorMessage = `Failed to parse PDF: ${error.message}`;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
