import { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Rating, Spinner } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import Form from './components/Form'
import Review from './components/Review'

export default function Testimony() {
   const [loading, setLoading] = useState(true)
   const [isShow, setShow] = useState(false)

   const [testimonies, setTestimonies] = useState([])
   const [ratings, setRatings] = useState({})
   const [page, setPage] = useState(0)
   const [maxPage, setMaxPage] = useState(0)

   // fetch testimony data from API
   const fetchTestimony = async () => {
      setLoading(true)
      const data = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/reviews?page=${page}&size=6`)

      if(data.data.status === 'OK') {
         setTestimonies(data.data.data)
         setRatings({ totalReviews: data.data.totalReviews, avgRating: data.data.avgRating })
         setMaxPage(data.data.totalPages)
         setLoading(false)
      } else {
         Swal.fire(
           'Something went wrong!',
           `Error message: ${data.data.message}`,
           'error'
         )
      }
      
      
   }

   useEffect(() => {
      fetchTestimony()
   }, [page])


   useEffect(() => {
      fetchTestimony()
   }, [])

   const switchPage = (pageNumber) => {
      const newPage = page + pageNumber
      if(newPage <= maxPage && newPage >= 0) {
         setPage(newPage)
      }
      
   }

   const hideModal = () => {
      setShow(false)
   }

   const onNewTestiBtn = () => {
      setShow(true)
   }

   const onClose = () => {
      setShow(false)
   }

	return (
		<div className="flex flex-col mt-5">
            <div className="flex flex-col md:flex-row md:justify-between w-50 py-2">
               <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold">What People are Saying</h2>
                  <div className="border w-20 border-purple-600 border-2"></div>
               </div>
               <div>
                  <button className="py-2 px-6 text-center text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-md text-white uppercase md:w-25" onClick={onNewTestiBtn}>New Testimony</button>
               </div>

               <Modal
                  show={isShow}
                  size="xl"
                  popup={true}
                  onClose={onClose}
               >
               <Modal.Header />
                  <Modal.Body>
                     <div className="px-4 pb-4 sm:pb-4 lg:px-4 xl:pb-4">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                           New Testimony
                        </h3>
                        <Form onHideModal={hideModal} />
                     </div>
                  </Modal.Body>
               </Modal>
            </div>
            <div className="mt-2 mb-4">
               <Rating>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                     {ratings.avgRating}
                  </p>
                  <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                  <a
                     href="#reviews"
                     className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                  >
                     {ratings.totalReviews} reviews
                  </a>
               </Rating>
            </div>

            <div className="text-center mt-2 mb-3">
               <button className="py-2 px-6 text-center text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-md text-white uppercase mr-2" onClick={() => switchPage(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
               <button className="py-2 px-6 text-center text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-md text-white uppercase" onClick={() => switchPage(+1)}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
            { (loading) ? <div className="grid justify-items-center py-4">
                        <Spinner
                         color="purple"
                         size="xl"
                         aria-label="Purple spinner example"
                       />
                     </div>
            : <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-4 w-100" id="reviews">
                     {testimonies.map((data) => 
                     <div className="p-1" key={data.id}>
                        <Review
                           name={data.Profile.fullName}
                           photo={data.Profile.photo}
                           position={data.Profile.position}
                           rating={data.rating}
                           linkedin={data.Profile.linkedin}
                           website={data.Profile.website}
                           comment={data.comment}
                         />
                     </div>
                  )}
            </div>
            }
         </div>
	)
}