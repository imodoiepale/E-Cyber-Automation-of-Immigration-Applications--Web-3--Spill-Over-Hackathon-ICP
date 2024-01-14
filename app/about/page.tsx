"use client";


import { Abouut } from "@/components/component/abouut";
import Nav from "../Nav";


export default function ServicesPage() {
   
    return (
        <main className="flex  flex-col items-center justify-between p-6 w-full">
            <div>
                <Nav />
                <Abouut />
            </div>
        </main>
    )
}
