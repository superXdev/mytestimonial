import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub, faMedium} from "@fortawesome/free-brands-svg-icons"

export default function About() {
   return (
      <div className="flex">
            <div className="flex-1 border p-4 rounded-md">
               <div className="flex flex-col md:flex-row">
                  {/* Profile avatar & email */}
                  <div className="text-center">
                     <img src="blank-avatar.png" className="w-64 md:w-full p-2 mx-auto" alt="" />
                     <div className="mt-2">
                        <h2 className="text-xl font-semibold text-center capitalize">Fikri Rudiansyah</h2>
                        <h3 className="text-sm">Software Developer</h3>
                        <div className="mt-2">
                           <a className="w-100 py-2 text-center text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-md text-white block uppercase" href="mailto:fikrizhanking@gmail.com">Contact me</a>
                        </div>
                     </div>
                  </div>
                  {/* Biodata */}
                  <div className="md:pl-6 pt-4 md:pt-2">
                     <h1 className="text-xl font-semibold">About Me</h1>
                     <div className="border w-20 border-purple-600 border-2"></div>
                     <p className="mt-2 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum non excepturi cupiditate provident quisquam a? Voluptas, consequatur, harum! Totam dicta nulla ipsum voluptas voluptatibus? Ullam dicta obcaecati illo quisquam, iusto!</p>
                     <h2 className="text-xl font-semibold mt-3">Social Links</h2>
                     <div className="border w-20 border-purple-600 border-2"></div>

                     <div className="mt-3 text-md">
                        <ul className="text-gray-700">
                           <li className="mb-1">
                              <a href="#" className="hover:text-fuchsia-600 font-medium">
                                 <FontAwesomeIcon icon={faGithub} /> Github
                              </a>
                           </li>
                           <li className="mb-1">
                              <a href="https://www.linkedin.com/in/fikri-rudiansyah-700b171b6/" className="hover:text-fuchsia-600 font-medium">
                                 <FontAwesomeIcon icon={faLinkedin} /> Linkedin
                              </a> 
                           </li>
                           <li className="mb-1">
                              <a href="#" className="hover:text-fuchsia-600 font-medium">
                                 <FontAwesomeIcon icon={faGlobe} /> Website
                              </a> 
                           </li>
                           <li className="mb-1">
                              <a href="#" className="hover:text-fuchsia-600 font-medium">
                                 <FontAwesomeIcon icon={faMedium} /> Medium
                              </a> 
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
   )
}