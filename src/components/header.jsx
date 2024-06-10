"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";


const Header = () => {
  
  const router = useRouter();
  const { data: session, status } = useSession(); 


  return (
    <header className="bg-[#a9a8ac] dark:bg-slate-950 p-4 w-full">
      <nav className="flex items-center sticky justify-between">
        <div>
          <Link href="/">
            <button className="dark:text-white text-slate-800 text-lg font-semibold hover:text-blue-500">
              Task Master
            </button>
          </Link>
        </div>
        <div className="flex">
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
        <div className="hidden md:flex md:space-x-4">
          {status=="authenticated" ? (
            <>
              <Link href="/profile/user" className="hover:text-green-600">
                {session.user?.name}
              </Link>
              <button
                className="ms-1 px-3 py-0 bg-red-700 text-white rounded-3xl hover:bg-red-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
                onClick={() =>{document.getElementById("my_modal").showModal();}
                 }
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="hover:text-yellow-800">
                Login
              </Link>
              <Link href="/signup" className="hover:text-yellow-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
        {status =="authenticated" ? (
          <div className="md:hidden z-50 drawer drawer-end justify-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-4"
                className="drawer-button bt"
              >
                &#8801;
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay z-50"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-50">
                {/* Sidebar content here */}
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
                 className="block ms-1 px-2 py-0 btn bg-red-700 text-white rounded-3xl hover:bg-red-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
                 onClick={() =>{document.getElementById("my_modal").showModal();}
                }
                 >
                   Logout
                </div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="md:hidden z-50 drawer drawer-end justify-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button bt"
            >
              &#8801;
            </label>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay z-50"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-50">
              {/* Sidebar content here */}
              
              <li>
              <Link href="/login" className="hover:text-yellow-800">
                   Login
                 </Link>
              </li>
              <li>
              <Link href="/signup" className="hover:text-yellow-600">
                 Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
          
        )}
      </nav>
      <dialog id="my_modal" className="modal">
        <div className="modal-box absolute top-0">
          <h3 className="font-bold text-lg text-red-600">Confirm Logout?</h3>
          <p className="py-4 text-white">
            Are you sure you want to logout?
          </p>
          <div className="modal-action">
            <form method="dialog">
             

              <button className="btn">NO</button>
              <button className="btn btn-warning m-3" onClick={()=>signOut()}>YES</button>
            </form>
          </div>
        </div>
      </dialog>
    </header>
  );
};

export default Header;
