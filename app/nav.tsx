import SmartLink from "@/utils/SmartComponents"
import Image from 'next/image'
import React, { ReactNode } from "react";


interface Props {
    children?: ReactNode
    href?: string
    height?: number
    width?: number
    src?: string
}

export function Navbar() {
    return (
        <nav className="bg-black fixed w-full z-20 top-0 inset-s-0 border-b border-gray-800">
            <div className="flex flex-wrap items-center justify-between mx-auto p-1 pl-6 pr-6">
                <SmartLink href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Icon src="/icon_full.png" height={35}/>
                    <span className="self-center text-xl text-heading font-semibold whitespace-nowrap font-google-sans">kermitco v6</span>
                </SmartLink>
                <div className="w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col border rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-3 md:mt-0 md:border-0 md:bg-neutral-primary top-8">
                        <NavElement href="/">Home</NavElement>
                        <NavElement href="/news/">News</NavElement>
                        <NavElement href="/games/">Games</NavElement>
                        <NavElement href="/settings/">Settings</NavElement>
                        <NavElement href="https://github.com/kermit-co/kermitco/">
                            <Icon height={32} src="/giticon_full.png"/>
                        </NavElement>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export function Icon({src="/icon_full.png", height}: Props) {
    return (
        <Image src={src} height={height} width={height} alt="kermitco icon."/>
    )
}

function NavElement({href, children}: Props) {
    return (
        <li className="p-3">
            <SmartLink href={href} prefetch={true} className="block text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 font-google-sans" aria-current="page">{children}</SmartLink>
        </li>
    )
}