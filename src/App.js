import About from './About'
import Testimony from './Testimony'

export default function App() {

   return (
      <div className="flex flex-col px-5 py-3 md:px-32 md:py-10">
         {/* About you */}
         <About />

         {/* Testimony section */}
         <Testimony />
      </div>
   )
}