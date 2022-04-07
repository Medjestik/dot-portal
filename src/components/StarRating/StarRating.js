import React from 'react';
import './StarRating.css';

function StarRating({ onChange }) {

  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);

  function handleChangeRating(stars) {
    setRating(stars);
    onChange(stars);
  }

  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={index <= (hover || rating) ? 'star-rating__btn star-rating__btn_type_on' : 'star-rating__btn star-rating__btn_type_off'}
            onClick={() => handleChangeRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;  