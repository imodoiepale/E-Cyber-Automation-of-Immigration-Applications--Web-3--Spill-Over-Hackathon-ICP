"use client";


import { Contact } from "@/components/component/contact";
import Nav from "../Nav";


export default function ServicesPage() {
   
    return (
        <main className="flex  flex-col items-center justify-between p-6">
            <div>
                <Nav />
                <Contact />
            </div>
        </main>
    )
}
