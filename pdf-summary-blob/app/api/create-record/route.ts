import { xata } from '@/utils/xata';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('fileName');
  console.log('searchParams' + searchParams);
  console.log(filename);

  // ... Your api route code

  // Create an empty record with no base64 content on a `myTableName` table. The column for the file is `myFileColumnName`.
  // Can also use `.update` for existing records
  const record = await xata.db.PDFDocuments.create(
    {
      file_content: {
        mediaType: 'application/pdf',
        base64Content: '',
        name: filename ?? '',
      },
      id: randomUUID(),
    },
    // Request an uploadUrl from the created record. We'll use this client-side to update the record.
    ['file_content.uploadUrl', 'id'],
  );

  return NextResponse.json({
    myUploadUrl: record.file_content?.uploadUrl,
    id: record.id,
  });
}
