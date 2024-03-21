export default async function Page({ params }: { params: { id: string } }) {
    const link = "https://hpacaornrjmmex3z.public.blob.vercel-storage.com/"
    const viewParams = "#toolbar=0&navpanes=0&scrollbar=0"
    return (<div className="container-xl bg-white h-screen p-2">
        <header className="flex items-center justify-between text-white border-b h-[4rem] p-2">
            <div className="flex-1 flex justify-center">
                <span className="text-xl font-semibold text-black">
                    Case Summary
                </span>
            </div>
        </header>
        <div className="flex h-screen">
            <div className="w-1/2 p-4">        <iframe
                src={link + params.id + viewParams}
                height="100%"
                width="100%"
            ></iframe></div>
            <div className="w-1/2 bg-blue-200 p-4">

                <div className="h-full flex justify-center items-center">
                    <p className="text-center text-5xl">Interact with chat GPT</p>
                </div>
            </div>
        </div>
    </div >
    );
}