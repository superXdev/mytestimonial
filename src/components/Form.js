import { useState } from 'react'
import axios from 'axios'
import { Label, TextInput, Textarea, Rating } from 'flowbite-react'
import Swal from 'sweetalert2'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

export default function Form(props) {
   const [reviews, setReviews] = useState({
      fullName: '',
      position: '',
      website: '',
      linkedin: '',
      reviews: {
         rating: 0,
         comment: ''
      }
   })
   const [photo, setPhoto] = useState([])
   const [errors, setErrors] = useState({
      fullName: false,
      position: false,
      comment: false
   })

   const verifyInput = () => {
      let allError = {}
      if(reviews.fullName === '') {
         allError.fullName = true
      }

      if(reviews.position === '') {
         allError.position = true
      }

      if(reviews.reviews.comment === '') {
         allError.comment = true
      }

      setErrors({ ...errors, ...allError })

      // has error or not
      return Object.keys(allError).length > 0
   }

   const handleTestimonySubmit = async () => {
      if(verifyInput()) {
         return
      }

      const result = await axios.post(process.env.REACT_APP_ENDPOINT_URL + '/reviews', {
         photo: (photo.length > 0) ? photo[0].serverId : null,
         ...reviews
      })
      
      if(result.data.status === "OK") {
         props.onHideModal()

         Swal.fire(
           'Thank you!',
           result.data.message,
           'success'
         )

         setReviews({
            fullName: '',
            position: '',
            website: '',
            linkedin: '',
            reviews: {
               rating: 0,
               comment: ''
            }
         })
      } else {
         const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
         })

         Toast.fire({
            icon: 'error',
            title: `Error message: ${result.data.message}`
         })
      }
   }

   const handleNameChange = (e) => {
      setReviews({ ...reviews, fullName: e.target.value })
   }

   const handlePositionChange = (e) => {
      setReviews({ ...reviews, position: e.target.value })
   }

   const handleLinkedinChange = (e) => {
      setReviews({ ...reviews, linkedin: e.target.value })
   }

   const handleWebsiteChange = (e) => {
      setReviews({ ...reviews, website: e.target.value })
   }

   const handleRating = (star) => {
      setReviews({ ...reviews, reviews: { ...reviews.reviews, rating: star } })
   }

   const handleCommentChange = (e) => {
      setReviews({ ...reviews, reviews: { ...reviews.reviews, comment: e.target.value } })
   }

	return (
		<div>
      <div className="mb-2">
         <div className="block">
            <Label
              htmlFor="photo"
              value="Your photo (optional)"
            />
         </div>
         <FilePond
             files={photo}
             onupdatefiles={setPhoto}
             server={process.env.REACT_APP_ENDPOINT_URL + '/upload'}
             name="photo"
         />
      </div>
			<div className="mb-2">
               <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row">
                     <div className="flex-1 md:mr-3 mb-2 md:mb-0">
                        <div className="block">
                           <Label
                             htmlFor="name"
                             value="Your name"
                           />
                           <span className='text-red-500 ml-1'>*</span>
                        </div>
                        <TextInput
                           id="name"
                           placeholder="John Doe"
                           required={true}
                           onChange={handleNameChange}
                           value={reviews.fullName}
                        />
                        {errors.fullName && <p className="text-sm text-red-500 mt-1">Full name input are required</p>}
                     </div>
                     <div className="flex-1">
                        <div className="block">
                           <Label
                             htmlFor="position"
                             value="Your position or job"
                           />
                           <span className='text-red-500 ml-1'>*</span>
                        </div>
                        <TextInput
                           id="position"
                           placeholder="Developer"
                           required={true}
                           onChange={handlePositionChange}
                           value={reviews.position}
                        />
                       {errors.position &&  <p className="text-sm text-red-500 mt-1">Position input are required</p>}
                     </div>
                  </div>
               </div>
            </div>
            <div className="mb-2">
               <div className="block">
                  <Label
                    htmlFor="website"
                    value="Your Website (optional)"
                  />
               </div>
               <TextInput
                  id="website"
                  placeholder="example.com"
                  required={false}
                  onChange={handleWebsiteChange}
                           value={reviews.website}
               />
            </div>
            <div className="mb-2">
               <div className="block">
                  <Label
                    htmlFor="linkedin"
                    value="Your Linkedin (optional)"
                  />
               </div>
               <TextInput
                  id="linkedin"
                  placeholder="linkedin.com/example"
                  required={false}
                  onChange={handleLinkedinChange}
                           value={reviews.linkedin}
               />
            </div>
            <div className="mb-2">
               <div className="block">
                  <Label
                    htmlFor="rating"
                    value="Rating"
                  />
                  <span className='text-red-500 ml-1'>*</span>
               </div>
               <Rating size="lg">
                 <div className="inline-block" onClick={() => handleRating(1)}>
                    <Rating.Star filled={reviews.reviews.rating >= 1 ? true : false} />
                 </div>
                 <div className="inline-block" onClick={() => handleRating(2)}>
                    <Rating.Star filled={reviews.reviews.rating >= 2 ? true : false} />
                 </div>
                 <div className="inline-block" onClick={() => handleRating(3)}>
                    <Rating.Star filled={reviews.reviews.rating >= 3 ? true : false} />
                 </div>
                 <div className="inline-block" onClick={() => handleRating(4)}>
                    <Rating.Star filled={reviews.reviews.rating >= 4 ? true : false} />
                 </div>
                 <div className="inline-block" onClick={() => handleRating(5)}>
                    <Rating.Star filled={reviews.reviews.rating === 5 ? true : false} />
                 </div>
               </Rating>
            </div>
            <div id="textarea" className="mb-2">
               <div className="block">
                  <Label
                     htmlFor="comment"
                     value="Your review"
                  />
                  <span className='text-red-500 ml-1'>*</span>
               </div>
               <Textarea
                  id="comment"
                  placeholder="Leave a comment..."
                  required={true}
                  onChange={handleCommentChange}
                  rows={3}
                  value={reviews.reviews.comment}
               />
               {errors.comment && <p className="text-sm text-red-500 mt-1">Comment input are required</p>}
            </div>
            <div className="mt-3">
               <button className="py-2 px-6 text-center text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-md text-white uppercase" onClick={handleTestimonySubmit}>Send Review</button>
            </div>
		</div>
	)
}