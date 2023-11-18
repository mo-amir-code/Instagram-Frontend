import React from 'react'
import IsLoggedInLoader from '../components/loaders/IsLoggedInLoader'
import { Link } from 'react-router-dom'

const LoginAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 h-full">
        <IsLoggedInLoader />
        <p className="text-text-primary text-base font-semibold cursor-pointer">
          You are not logged in, Please login your account{" "}
          <span className="text-text-link">
            <Link to={"/auth/signin"}>here</Link>
          </span>
        </p>
      </div>
  )
}

export default LoginAccount
