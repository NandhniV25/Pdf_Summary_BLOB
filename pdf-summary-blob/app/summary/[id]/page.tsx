import { fetchFileName } from "@/app/lib/action";

export default async function Page({ params }: { params: { id: string }}) 
{
    const id = params.id;
    const filename = await fetchFileName(id);   
    var fileContentAfterDecode = new TextDecoder().decode(filename.file_content);
    console.log(id + " - "+id);
    console.log(id + " - "+filename.file_name);
    console.log(id + " - "+fileContentAfterDecode);
    return (<div><div>
        {filename.file_name}
    </div>
    <div>
        {fileContentAfterDecode}
    </div>
    </div>
    );
}