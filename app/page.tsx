import Image from "next/image";
import { MainContentBox, MainContentHeader} from "@/utils/KermitcoSpecific"
import {ColButon} from "@/client/CoolButton"

export default function Home() {
    
    return (
        <MainContentBox>
            <p className="text-center">
                <MainContentHeader />
                <br /> <br />
                kermitco is a nonprofit(ish) project meant to incorporate various types of &quot;off topic&quot; learning.
                <br />
                <ColButon />
            </p>
        </MainContentBox>
    );
}