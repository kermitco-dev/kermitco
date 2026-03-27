import { ReactNode } from "react";
import { promises as fs } from 'fs';

interface Props {
    children?: ReactNode
    name?: string
}



export function MainContentBox({children}:Props) {
    return (
        <main className="mt-14 h-full">
            <div className="flex flex-col flex-1 items-center justify-center font-sans p-4 h-max">
                <div className="flex flex-auto max-w-5xl min-w-4xl mx-auto bg-gray-950 rounded-md border border-gray-800 p-6 justify-center text-center">
                    {children}
                </div>
            </div>
        </main>
    )
}
export async function MainContentHeader({name=""}:Props) {
    const file = await fs.readFile(process.cwd() + '/app/config.json', 'utf8');
    const data = JSON.parse(file);
    return (<>
        <span className="font-bold font-google-sans text-white tracking-wide text-3xl">kermitco{name==""?"":" - " + name}</span>
        <br/>
        <span className="text-sm text-gray-400 font-google-sans">kermitco v{data.version}</span>
    </>)
}