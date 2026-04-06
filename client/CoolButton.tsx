'use client'
import { useState } from 'react';
export function ColButon() {
    const [toggleSpec, setToggleSpec] = useState(false);
    function handle_random_button() {
        setToggleSpec(!toggleSpec);
    }
    return <button className="p-3 pt-1.5 pb-1.5 margin bg-gray-950 rounded-md border border-gray-700" onClick={handle_random_button}>{toggleSpec ? 'hola como estas mate u shold press me' : 'nah'}</button>
}