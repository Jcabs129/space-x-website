/*
pt 3 - https://www.youtube.com/watch?v=DKzprvzbS14&t=229s
*/

import React from 'react'

//MissionKey Component
export default function MissionKey() {
  return(
    <div className="my-3">
      <p>
        <span className="px-3 mr-2 bg-success" /> = Success
      </p>
      <p>
        <span className="px-3 mr-2 bg-danger" /> = Failed
      </p>
    </div>
  );
}
