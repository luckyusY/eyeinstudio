import type { Metadata } from "next";
import { PrintOrderForm } from "@/components/print-order-form";
export const metadata:Metadata={title:"Order Photo Prints",description:"Upload and order premium photo, canvas and large-format prints in Kigali."};
export default function PrintPage(){return <section className="min-h-screen px-4 pb-24 pt-36"><div className="mx-auto max-w-3xl"><p className="eyebrow text-center">From screen to something real</p><h1 className="display mt-4 text-center text-6xl">Prints made to last.</h1><p className="mx-auto mb-10 mt-5 max-w-xl text-center leading-7 text-stone-400">Upload your image, choose a finish and get an instant print estimate. We’ll inspect every file before production.</p><PrintOrderForm/></div></section>}
