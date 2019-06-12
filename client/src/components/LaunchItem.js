/*
part 2 - https://www.youtube.com/watch?v=-XwkFm5a9lw&t=975s
22mins 33 secs (LaunchItem.js)
*/

import React from 'react'
import classNames from 'classnames'  //https://www.npmjs.com/package/classnames
import Moment from 'react-moment';   //Date format library/package for react
import { Link } from 'react-router-dom';
export default function LaunchItem({
  launch: {
    flight_number,
    mission_name,
    launch_date_local,
    launch_success
  }
}) {
  return(
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Mission:
          <span className={classNames({
            'text-success':launch_success,       // 'text-success' is related to the library bootstrap which we are using. it represents a colour success=green
            'text-danger':!launch_success       // '!launch_success' if launch is not successful we assign the colour red as 'alert danger'
          })}
          >
          { mission_name }
          </span><
          /h4>
          <p>Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment></p>


        </div>

        <div className="col-md-3">
          <Link to={`/launch/${flight_number}`}className="btn btn-secondary">Launch Details</Link>
        </div>
      </div>
    </div>
  )
}
