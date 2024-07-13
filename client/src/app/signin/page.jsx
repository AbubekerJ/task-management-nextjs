'use client'
import { useUser } from '@/app/Context/UserContext';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';



const SignIn = () => {

  const [form, setForm] = useState({});
  const {  signIn, } = useUser();
  const router = useRouter()
  const [loading , setLoding]=useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    console.log(form);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
  
    try {

      setLoding(true) 
    const res = await fetch('https://task-management-nextjs.onrender.com/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      credentials: 'include', 
    });
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      setLoding(false)
       toast.error(data.message)
      return;
    }
    console.log(data)
    toast.success('sign In successfull')
    signIn(data)
   
    router.push('/dashbord')
    } catch (error) {
      setLoding(false)
      toast.error(error.message)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="font-semibold text-center text-4xl text-white mb-8">Sign In</h1>
        
        <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
          <input
            required
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            onChange={handleChange}
          />
          <button  disabled={loading}
           
            className="border p-3 rounded-lg bg-gray-800 text-white uppercase hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              {loading? 'LODING...':'signin'}
             
               
          </button>
       
        </form>
        
        <div className="flex mt-3 gap-1">
          <p className="text-gray-700">Dont Have an Account?</p>
          <Link href='/register'>
          <span className="text-blue-500">Register</span>
          </Link>
            
         
        </div>

      </div>
    </div>
  );
};

export default SignIn;

