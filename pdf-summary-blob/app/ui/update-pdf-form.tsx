'use client';

import { Button } from '@/app/ui/button';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { redirect } from 'next/navigation';

export default function Form()
{
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    
    return (
      <>
      <h1>Upload Your PDF File here..</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/document?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );

          const newBlob = (await response.json()) as PutBlobResult;

          console.log(newBlob.url)
          var arr = newBlob.url.split("/")
          var fullFileName = arr[arr.length - 1];
          //redirect("/summary/"+fullFileName);
          location.replace("/summary/"+fullFileName)
          
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <Button type="submit">Get Summary</Button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
    );
  }