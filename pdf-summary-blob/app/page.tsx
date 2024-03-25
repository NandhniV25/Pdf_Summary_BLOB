'use client';

import { useRef } from 'react';

export default function Page() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="container-xl bg-white h-screen p-2">
        <div className="flex justify-between items-center md:justify-between md:items-center">
          <img alt="logo" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" className="color:transparent" src="/logo.webp" />
        </div>
        <div className="w-full flex flex-col justify-center items-center md:mt-10">
          <div className="flex flex-col justify-center items-center space-y-6">
            <h1 className="lg:text-6xl font-serif p-4 text-black text-4xl text-center">
              Legal Summaries Made Simple
            </h1>
            <p className="md:text-2xl font-sans text-center w-3/4 text-xl">
              Leverage cutting-edge Artificial Intelligence to distill lengthy legal briefs, contracts, and documents into concise, clear summaries.
            </p>
            <div className="w-full">
              <div className="flex flex-col items-center justify-center bg-white">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center w-3/5 h-48" style={{ border: '2px dashed black' }}>
                  <div className="p-6 pt-0">
                    <input onChange={async (event) => {
                      event.preventDefault();

                      if (!inputFileRef.current?.files) {
                        throw new Error("No file selected");
                      }

                      const file = inputFileRef.current.files[0];
                      try {
                        // Call the server API from step 1 above
                        //
                        const response = await fetch('/api/create-record?fileName=' + file.name, {
                          method: 'POST'
                        });
                        if (response.status !== 200) {
                          throw new Error("Couldn't create record");
                        }

                        const responseJson = await response.json();
                        debugger;
                        console.log("responseJson " + responseJson.myUploadUrl)
                        console.log("responseJsonid " + responseJson.id)

                        try {
                          // Put the file inside a FormData object
                          const formData = new FormData();
                          const fileObj = file;
                          formData.append('fileType', fileObj.type);
                          // Use `myUploadUrl` from the server response to upload the file on the client
                          await fetch(responseJson.myUploadUrl, { method: 'PUT', body: file });
                          location.href = "/summary/" + responseJson.id
                        } catch (error) {
                          debugger;
                          throw new Error("Couldn't upload image because the image wasn't accepted");
                        }
                      } catch (error) {
                        debugger;
                        throw new Error("Couldn't upload image because the record wasn't created");
                      }
                    }} ref={inputFileRef} type="file" accept="application/pdf" style={{ display: 'none' }} className="file-input" />
                    <button onClick={() => inputFileRef.current?.click()} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                      <div className="flex flex-col">
                        <img alt="logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="md:ml-32 ml-12" style={{ color: 'transparent' }} src="/file.webp" />
                        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap flex flex-col md:flex-row justify-center items-center">
                          <p> Drag and Drop pdf </p>
                          <p className="ml-1">or</p>
                          <p className="ml-1">Click here to browse.</p><br />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 mt-5">
          <div className="text-center text-base ml-4">
            Wondering where to begin?
          </div>
          <div className="text-center text-3xl font-bold ml-4">
            Try some Sample Judgements
          </div>
          <ul className="flex space-x-8 items-center justify-center">
            <li className="hover:text-[#17A34A] hover:cursor-pointer hover:underline max-w-[30%] truncate">
              <a href="/summary/f989be9a-6aed-49af-a174-eaed13423042/1">
                <img alt="PDF icon" loading="lazy" width="48" height="48" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="pdf.svg" />
                Sample File 1
              </a>
            </li>
            <li className="hover:text-[#17A34A] hover:cursor-pointer hover:underline max-w-[30%] truncate">
              <a href="/summary/2f52dc2d-9032-4d50-b440-5e59f9092861/1">
                <img alt="PDF icon" loading="lazy" width="48" height="48" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="pdf.svg" />
                Sample File 2
              </a>
            </li>
            <li className="hover:text-[#17A34A] hover:cursor-pointer hover:underline max-w-[30%] truncate">
              <a href="/summary/022adee0-1d90-4406-aeab-2300e3e7edad/1">
                <img alt="PDF icon" loading="lazy" width="48" height="48" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="pdf.svg" />
                Sample File 3
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
