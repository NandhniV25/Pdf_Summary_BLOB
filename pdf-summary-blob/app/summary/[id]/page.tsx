export default async function Page({ params }: { params: { id: string } }) {
    const link = "https://hpacaornrjmmex3z.public.blob.vercel-storage.com/"
    const viewParams = "#toolbar=0&navpanes=0&scrollbar=0"
    return (<div className="container-xl bg-white h-screen p-2">
        <iframe
            src={link + params.id + viewParams}
            height="100%"
            width="50%"
        ></iframe>
    </div >
    );
}