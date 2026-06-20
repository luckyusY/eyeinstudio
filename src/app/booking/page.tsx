import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
export const metadata:Metadata={title:"Book a Session",description:"Request a studio, wedding or event photography session in Kigali."};
export default function BookingPage(){return <section className="min-h-screen px-4 pb-24 pt-36"><div className="mx-auto max-w-3xl"><p className="eyebrow text-center">Reserve your date</p><h1 className="display mt-4 text-center text-6xl">Let’s create together.</h1><p className="mx-auto mb-10 mt-5 max-w-xl text-center leading-7 text-stone-400">Tell us what you’re planning. We’ll confirm availability, shape the right package and guide you from there.</p><BookingForm/></div></section>}
