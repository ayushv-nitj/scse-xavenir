"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Credentials() {

  const router = useRouter();

  const [form,setForm] = useState({
    email:"",
    fullName:"",
    password:"",
    collegeName:""
  });

  const handleChange = (e:any)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e:any)=>{
    e.preventDefault();

    const res = await fetch("/api/auth/fillCredentials",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    });

    const data = await res.json();

    if(res.ok){
      alert("Registration successful");
      router.push("/login");
    }
    else{
      alert(data.error);
    }
  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-xl w-[400px] space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">
          Complete Registration
        </h1>

        <input
          name="email"
          placeholder="Email"
          className="w-full p-3 bg-black border border-gray-700 rounded"
          onChange={handleChange}
        />

        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full p-3 bg-black border border-gray-700 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 bg-black border border-gray-700 rounded"
          onChange={handleChange}
        />

        <input
          name="collegeName"
          placeholder="College Name"
          className="w-full p-3 bg-black border border-gray-700 rounded"
          onChange={handleChange}
        />

        <button
          className="w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700"
        >
          Register
        </button>

      </form>

    </main>
  );
}