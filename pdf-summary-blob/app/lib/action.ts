'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { text } from 'stream/consumers';
import { isUtf8 } from 'buffer';
import { UUID } from 'crypto';
import { unstable_noStore as noStore } from 'next/cache';
import { FileField } from './definition';

export type State = {
    errors?: {
      file?: string[];
    };
    message?: string | null;
  };

  export type LatestDocRaw = {
    id: UUID;
  };

export async function updatePdf(prevState: State, formData: FormData) {
  noStore();
  var savedId = ""
    // Insert data into the database
    try {
        var test = formData.get('file') as File
        var fileContent = await test.text()
        var fileContentAfterEncode = Buffer.from(fileContent, 'base64').toString();
        //var fileContentAfterEncode = new TextDecoder().decode(await test.arrayBuffer());
        console.log(fileContentAfterEncode)
        var id = await sql`
        insert into case_docs (file_name, file_content)
        values (${test.name}, ${fileContentAfterEncode})
        RETURNING id, file_name;`
        savedId = id.rows[0].id
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to upload.',
      };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/summary/'+savedId);
    return redirect('/summary/'+savedId);
  }

  export async function fetchFileName(id: string) {
    try {
      const file_name = await sql<FileField>`
      select file_name, file_content from case_docs where id = ${id}
      `;
  
      return file_name.rows[0];
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch');
    }
  }


