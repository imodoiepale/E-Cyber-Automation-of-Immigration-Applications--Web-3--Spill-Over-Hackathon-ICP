"use client";

import { useEffect, useState } from "react";
import { type Doc, initJuno, setDoc } from "@junobuild/core-peer";
import { FrontPage } from "@/components/component/front-page";
import Nav from "./Nav";
import { Toaster } from "@/components/ui/sonner"

type Record = {
  hello: string;
};


export default function Home() {
  const [record, setRecord] = useState<Doc<Record> | undefined>(undefined);

  // TODO: Replace 'satelliteId' with your actual satellite ID
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "p4hsy-kiaaa-aaaal-admza-cai",
      }))();
  }, []);

  const insert = async () => {
    const doc = await setDoc({
      collection: "demo",
      doc: {
        key: `my-key-${new Date().getTime()}`,
        data: {
          hello: "world",
        },
      },
    });

    setRecord(doc);
  };
  return (
    <main className="flex  flex-col items-center justify-between p-6">
      <div>
        <Nav />
        <Toaster />
        <FrontPage/>
      </div>
    </main>
  )
}
