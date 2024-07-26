"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";


const Header = () => {
  
  const router = useRouter();
  const { data: session, status } = useSession(); 
  const userName = session?.user.name;
  let picture_url;
  if (session) {
    picture_url = session?.user.image || `https://ui-avatars.com/api/?name=${userName}&background=random&bold=true`;
  }else{
    picture_url = "/profile.png"
  }

  return (
    <header className="bg-white  p-4 w-full">
      <nav className="flex items-center justify-around h-20">
        
          <Link href="/">
            <button className=" font-Montserrat font-bold text-black flex items-center text-lg uppercase hover:text-blue-500">
              <img src="/logo.png" alt="logo " className="w-7 h-7 m-2" /><span className="mt-1">Task Master</span> 
            </button>
          </Link>
        
        <div className="flex font-poppins font-light uppercase text-black">
          {status =="authenticated" && (
            <ul className="flex m-3 justify-items-center">
              <li className="hidden md:block m-3">
                <Link href="/addtask" className="hover:text-blue-500">
                  Add Task
                </Link>
              </li>
              <li className="hidden md:block m-3">
                <Link href="/your-tasks" className="hover:text-blue-500">
                  Show Tasks
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="hidden md:flex md:space-x-4 text-black">
          {status=="authenticated" ? (
            <div className="flex items-center space-x-2">
             
                  <div className="avatar dropdown dropdown-end cursor-pointer">
                    <div tabIndex={0} className="w-12 rounded-full">
                      <img src={picture_url} alt="user profile" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                      <li>
                        <Link href="/profile/user" className="hover:text-blue-500 mb-2 font-poppins font-bold">
                          Profile ({session.user.name})
                        </Link>
                      </li>
                      <li>
                        <button
                        className="btn bg-red-600 hover:bg-red-500"
                        onClick={() =>{document.getElementById("my_modal").showModal();}}>
                          Logout
                         </button>
                      </li>
                    </ul>
                  </div>
              
              
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline ">
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
        {status =="authenticated" ? (
          <div className="md:hidden dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1 btn-outline text-5xl ">&#8801;</div>
            <ul tabIndex={0} className="dropdown-content menu bg-white text-black rounded-box z-[1] w-52 p-2 shadow">
            <li>
                 <Link href="/addtask" className="hover:text-blue-500">
                  Add Task
                  </Link>
                 </li>
                 <li>
                 <Link href="/your-tasks" className="hover:text-blue-500">
                   Show Tasks
                  </Link>
                 </li>
                 <li>
                 <Link href="/profile/user" className="hover:text-green-600">
                  Profile ({session.user.name})
                </Link>
                 </li>
                 <li>
                 <div
                  className="btn bg-red-600"
                  onClick={() =>{document.getElementById("my_modal").showModal();}
                 }
                  >
                    Logout
                 </div>
                 </li>
            </ul>
        </div>
       
        ) : (
          <div className="md:hidden dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1 btn-outline text-5xl">&#8801;</div>
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <Link href="/signup" className="btn btn-primary m-1">
                    Sign Up
                  </Link>
                </li>
                <li>
                    <Link href="/signin" className="btn btn-outline m-1">
                      Login
                    </Link>
                </li>
              </ul>
          </div>
      
          
        )}
      </nav>
      {/* <!-- The Modals --> */}
      <dialog id="my_modal" className="modal">
        <div className="modal-box absolute top-0 h-fit bg-secondary">
          <h3 className="font-bold text-lg text-red-600">Confirm Logout?</h3>
          <p className="py-4 text-white">
            Are you sure you want to logout?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn py-0">NO</button>
              <button className="btn mx-3 bg-red-500 hover:bg-red-600 m-3" onClick={()=>signOut()}>YES</button>
            </form>
          </div>
        </div>
      </dialog>
    </header>
  );
};

export default Header;
