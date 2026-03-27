import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

export function MainContentBox({children}:Props) {
    return (
        <main className="mt-14 h-full">
            <div className="flex flex-col flex-1 items-center justify-center font-sans p-4 h-max">
                <div className="flex flex-auto max-w-5xl min-w-xl mx-auto bg-gray-950 rounded-md border border-gray-800 p-6 justify-center">
                    {children}
                </div>
            </div>
        </main>
    )
}