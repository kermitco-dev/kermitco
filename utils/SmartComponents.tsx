import Link from 'next/link'
import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode
    href?: string
    prefetch?: boolean
    className?: string
}


export default function SmartLink({children, href="", prefetch=false, className=""}: Props) {
    const httpRegEx = /^http/;
    return httpRegEx.test(href) ? <Link href={href} className={className} prefetch={prefetch}>{children}</Link> : <a href={href} className={className}>{children}</a>
}