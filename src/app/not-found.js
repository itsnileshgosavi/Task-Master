import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <h2>Oops not sure what you lookin for!</h2>
      <p>Could not find requested resource</p>
      <Link className='btn btn-secondary mx-auto' href="/">Return Home</Link>
    </div>
  )
}