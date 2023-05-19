import React from 'react'
import Navigation from '../components/Navigation'
import ApplicationForm from '../components/ApplicationForm'

function Registration() {
  return (
    <div>
        <Navigation />
        <div className='container'>
          <h1>Application Page</h1>
          <ApplicationForm />
        </div>
    </div>
  )
}

export default Registration