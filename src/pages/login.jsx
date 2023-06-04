import Input from "@/Components/CommonComponents/Input";
import Link from "next/link";
import { useState } from "react";
import {app} from "../Config/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'next/router';
import useAuthStore from "@/Store/Store";

export default function Login() {
  const [credentials, setCredentials] = useState({});
  const { Signup } = useAuthStore();
  // auth 
  const auth = getAuth();

  // router
  const router = useRouter();


  // functions
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((response) => {
        console.log(response.user)
        Signup(response.user.accessToken);
        router.push('/')
      })
      .catch(err => {
        alert('Cannot Log in')
      })
  }
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
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center  text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
