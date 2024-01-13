"use client"
import Link from 'next/link';
import UserContext from '@/app/context/userContext';
import { useContext, useEffect } from 'react';
import { logout } from '@/app/services/userServices';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Header = () => {
  const context = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      
      console.log(context)
    }, 5000);

   
    return () => clearTimeout(timeoutId);
  }, [context]);
  

  const doLogout = async () => {
    try {
      const result = await logout();
      console.log(result);
      context.setUser(undefined);
      router.push("/login");
      toast.info("Logged out");
    } catch (error) {
      console.log("Something went wrong logging out");
      toast.error("Error logging out");
    }
  };

  return (
    <header className="bg-slate-950 p-4">
      <nav className="flex items-center sticky justify-between">
        <div>
          <Link href="/">
            <button className="text-white text-lg font-semibold hover:text-blue-500">Task Manager</button>
          </Link>
        </div>
        <div className='flex'>
          {context.user && (
            <ul className='flex m-3 justify-items-center'>
              <li className='m-3'>
                <Link href="/addtask" className='hover:text-blue-500'>Add Task</Link>
              </li>
              <li className='m-3'>
                <Link href="/your-tasks" className='hover:text-blue-500'>Show Tasks</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex space-x-4">
          {context.user ? (
            <>
              <Link href="/profile/user" className='hover:text-green-600'>{context.user.name}</Link>
              <button className="text-white hover:text-red-700" onClick={doLogout}>Logout</button>
            </>
          ) : (
            <>
            
              <Link href="/login" className='hover:text-yellow-800'>Login</Link>
              <Link href="/signup" className='hover:text-yellow-600'>Sign Up</Link>
              
            </>
            
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
