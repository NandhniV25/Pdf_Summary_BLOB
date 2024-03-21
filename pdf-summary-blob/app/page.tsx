import Form from "./ui/update-pdf-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4">
        <div className="items-center flex justify-center gap-6 rounded-lg bg-blue-400 px-6 py-10">
          <p className={`items-center text-xl text-justify-center text-black-500 md:text-3xl md:leading-normal`}>
            <strong>Unlocking Legal Complexity, Empowering your journey</strong> 
          </p>
        </div>
          <Form/>
      </div>
    </main>
  );
}
