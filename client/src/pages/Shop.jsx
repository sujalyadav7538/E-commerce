/* eslint-disable no-unused-vars */
import Hero from "../components/hero";
import { Newcollections } from "../components/newcollections";
import { Newsletter } from "../components/newsletter";
import { Offers } from "../components/offers";
import Popular from './../components/popular';


export default function Shop() {
  return (
    <div>
     <Hero/>
     <Popular/>
     <Offers/>
     <Newcollections/>
     <Newsletter/>
    </div>
  )
}
