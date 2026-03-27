import Image from "next/image";
import { MainContentBox } from "@/utils/KermitcoSpecific"

export default function Home() {
  return (
    <MainContentBox>
        <p className="text-center">
            <span className="font-bold font-google-sans text-white tracking-wide text-3xl">kermitco v6</span>
            <br />
            <span className="text-sm">kermitco v6a.0</span>
            <br /> <br />
            kermitco is a nonprofit(ish) project meant to incorporate various types of &quot;off topic&quot; learning.
        </p>
    </MainContentBox>
  );
}
