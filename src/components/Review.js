import { Rating, Card } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Review(props) {
	return (
		<Card> 
          <div className="flex flex-col items-center pb-4">
            <img
              className="mb-3 h-24 w-24 rounded-full shadow-lg"
              src={props.photo ? props.photo : 'blank-avatar.png'}
              alt={props.name + " photo"}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {props.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {props.position}
            </span>
            <div className="mt-2">
            	{props.linkedin && <a href={props.linkedin} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-fuchsia-600 font-medium mr-2">
	             	<FontAwesomeIcon icon={faLinkedin} />
	            </a>}
            	{props.website && <a href={props.website} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-fuchsia-600 font-medium mr-2">
	             	<FontAwesomeIcon icon={faGlobe} />
	            </a>}
            </div>
            <div className="flex space-x-3 lg:mt-3 mt-2 border-top-1">
            	
               <p className="text-gray-700 text-center">"{props.comment}"</p>
            </div>
            <div className="mt-3">
               <Rating size="sm">
	              <Rating.Star filled={props.rating >= 1 ? true : false} />
	              <Rating.Star filled={props.rating >= 2 ? true : false} />
	              <Rating.Star filled={props.rating >= 3 ? true : false} />
	              <Rating.Star filled={props.rating >= 4 ? true : false} />
	              <Rating.Star filled={props.rating === 5 ? true : false} />
	           </Rating>
            </div>
          </div>
        </Card>
	)
}