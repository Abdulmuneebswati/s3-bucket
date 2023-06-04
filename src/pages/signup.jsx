import React, { useEffect } from 'react'
import Input from '@/Components/CommonComponents/Input'
import Link from "next/link";
import { useState } from "react";
import { app } from "../Config/firebase"

import {
  getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth"
import { useRouter } from 'next/router';
import useAuthStore from '@/Store/Store';
const Signup = () => {

  // sign up
  const { Signup } = useAuthStore();
  const [credentials, setCredentials] = useState({});
  // auth
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  // router
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(() => {
        console.log(response.user)
        // sessionStorage.setItem('Token', response.user.accessToken);
        Signup(response.user.accessToken)
        router.push("/")
      })
  }
  const signUpWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((response) => {
        sessionStorage.setItem('Token', response.user.accessToken)
        console.log(response.user)
        router.push('/')
      })
  }

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        sessionStorage.setItem('Token', response.user.accessToken)
        console.log(response.user)
        router.push('/')
      })

  }

  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if (token) {
      router.push('/')
    }
  }, [])
  //************************
  //return
  //************************ 
  return (
    <div className="relative flex flex-col  items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-grey-500 rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        <form className="mt-6" action="POST">
          <div className="mb-4"><Input htmlFor="email" type="email" labelText="Email" handleChange={handleChange} /></div>
          <div className="mb-2">
            <Input htmlFor="password" type="password" labelText="Password" handleChange={handleChange} />
          </div>
          <Link
            href="/forget"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-2">
            <button type="submit" onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex gap-x-2 mt-2">
          <div class="px-6  sm:px-0 max-w-sm flex-[50%]">
            <button type="button" onClick={signUpWithGoogle} class="text-white w-full   bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-[11.5px] text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">

              <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" width="24" height="24" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
          </div>

          <div className="flex-[50%]  px-6 sm:px-0 max-w-sm ">
            <button type="button" onClick={signUpWithGithub} class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                <path xmlns="http://www.w3.org/2000/svg" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>Sign up with Github</button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Signup
