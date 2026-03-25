import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
        <div className="flex flex-auto max-w-sm w-full mx-auto bg-slate-700 rounded-md border border-gray-500 p-6 justify-center">
            <h1 className="font-bold text-white tracking-wide text-2xl">kermitco v6</h1>
        </div>
    </div>
  );
}
