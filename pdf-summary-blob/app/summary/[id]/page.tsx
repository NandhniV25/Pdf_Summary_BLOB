import { xata } from "@/utils/xata";

export default async function Page({ params }: { params: { id: string } }) {
    const record = await xata.db.PDFDocuments.read(params.id);
    console.log(record);

    const downloadUrl = record?.file_content?.url;
    console.log(downloadUrl)

    const axios = require('axios').default;

    const { data } = await axios.post('https://nandhniv25--pdf-to-text-web-endpoint-readpdffile.modal.run', {
        url: downloadUrl
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )

    //console.log(data)
    const viewParams = "#toolbar=0&navpanes=0&scrollbar=0"

    return (
        <div className="container-xl bg-white h-screen p-2">
            <header className="flex items-center justify-between text-white border-b h-[4rem] p-2">
                <div className="flex-1 flex justify-center">
                    <span className="text-xl font-semibold text-black">
                        Case Summary
                    </span>
                </div>
            </header>
            <div className="flex h-screen">
                <div className="w-1/2 p-4">
                    <iframe
                        src={downloadUrl + viewParams}
                        height="100%"
                        width="100%"
                    >
                    </iframe>
                </div>
                <div className="w-1/2 bg-white-200 p-4">
                    <div className="h-full flex justify-center items-center">
                        <p className="h-full flex text-center text-l">{data}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}