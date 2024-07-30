'use client'

const Verify = () => {
  return (
    <>
   <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold uppercase text-black">Please verify your email</h1>
        <button className="btn btn-secondary my-5">Send Verification Code to Email</button>
        <input type="tel" name="verificationCode" id="verificationCode" className="input input-bordered my-3 bg-white text-black" />
        <button className="btn btn-primary my-5">Verify</button>
   </div>
    </>
  )
}

export default Verify