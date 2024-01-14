import Link from "next/link"
import Image from "next/image"
import { CardContent, Card } from "@/components/ui/card"

export function FrontPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 ">
        <div className="flex flex-col items-center space-y-4 text-center ">
          <div className="space-y-2 mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Hi there, Welcome to E-Migration.
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 pt-4">
              Which application do you want to apply today?
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {/* Special Pass Card */}
            <Link href="/special-pass">
              
                <Card className="transform transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <CardContent className="flex flex-col items-center space-y-2">
                    <Image
                      alt="Passport"
                      className="aspect-square overflow-hidden rounded-lg object-cover object-center"
                      height="200"
                      src="/passport.jpeg"
                      width="200"
                    />
                    <h2 className="text-lg font-bold">Special Pass</h2>
                  </CardContent>
                </Card>
            </Link>

            {/* Business Permit Card */}
            <Link href="/business-permit">
              
                <Card className="transform transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <CardContent className="flex flex-col items-center space-y-2">
                    <Image
                      alt="Business Permit"
                      className="aspect-square overflow-hidden rounded-lg object-cover object-center"
                      height="200"
                      src="/bizz.png"
                      width="200"
                    />
                    <h2 className="text-lg font-bold">Business Permit</h2>
                  </CardContent>
                </Card>
              
            </Link>

            {/* Work Permit Card */}
            <Link href="/work-permit">
              
                <Card className="transform transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <CardContent className="flex flex-col items-center space-y-2">
                    <Image
                      alt="Work Permit"
                      className="aspect-square overflow-hidden rounded-lg object-cover object-center"
                      height="200"
                      src="/work.png"
                      width="200"
                    />
                    <h2 className="text-lg font-bold">Work Permit</h2>
                  </CardContent>
                </Card>
              
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
