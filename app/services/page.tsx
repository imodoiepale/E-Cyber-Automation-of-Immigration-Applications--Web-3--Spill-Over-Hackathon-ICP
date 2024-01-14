"use client";


import { About } from "@/components/component/about";
import Nav from "../Nav";


export default function ServicesPage() {
   
    return (
        <main className="flex  flex-col items-center justify-between p-6">
            <div>
                <Nav />
                <About />
            </div>
        </main>
    )
}
