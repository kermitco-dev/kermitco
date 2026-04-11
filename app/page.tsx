import Image from "next/image";
import { MainContentBox, MainContentHeader} from "@/utils/KermitcoSpecific"
import { ColButon } from "@/client/CoolButton"
import { cookies } from 'next/headers'

export default async function Home() {
    const cookie = await cookies();
    if (cookie.has("theme"))
        console.log(cookie.get("theme").name);
    async function set_in_cookie() {
        'use server'
        const cookie = await cookies();
        cookie.set("theme", "default_background");
        console.log('cookie event fired')
    }
    return (
        <MainContentBox>
            <p className="text-center">
                <MainContentHeader />
                <br /> <br />
                kermitco is a nonprofit(ish) project meant to incorporate various types of &quot;off topic&quot; learning.
                <br />
                <ColButon />
                <br />
                <button onClick={set_in_cookie}>press</button>
            </p>
        </MainContentBox>
    );
}