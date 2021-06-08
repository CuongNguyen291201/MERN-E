import React from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

import Notfound from './img/not-found.svg';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Oops! Page not found.</h2>
      <div>
        <Zoom>
          <img src={Notfound} alt=""/>
        </Zoom>
      </div>
      <h4>We can't find the page you're looking for.</h4>
      <Link to="/">Go back home</Link>
    </div>
  )
}

export default NotFound
