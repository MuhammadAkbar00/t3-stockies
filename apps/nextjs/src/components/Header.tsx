import { useRouter } from "next/router";
import { useUser } from "../context/authContext";
import React, { useState } from "react";
import SideBar from "./SideBar";

export default function Header() {
  const router = useRouter();
  const { user, handleLogout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  function logout() {
    handleLogout();
    setIsOpen(false);
  }

  function handleOnClick() {
    if (user) {
      setIsOpen((open) => !open);
    } else {
      router.push("/sign-in");
    }
  }
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-screen-2xl items-center justify-between p-3 lg:px-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <h1 className="font-lato text-primary text-2xl font-bold tracking-tight">
              Stockies
            </h1>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsOpenSideBar((prevOpen) => !prevOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative"></div>

          <a
            href="/articles"
            className="font-lato text-sm font-normal leading-6 text-[#666666]"
          >
            Articles
          </a>
          <a
            href="/companies"
            className="font-lato text-sm font-normal leading-6 text-[#666666]"
          >
            Companies
          </a>
          <a
            href="/favorites"
            className="font-lato text-sm font-normal leading-6 text-[#666666]"
          >
            Favorites
          </a>
        </div>
        <div className="relative hidden hover:cursor-pointer lg:flex lg:flex-1 lg:justify-end">
          <a
            onClick={handleOnClick}
            className="font-lato text-sm font-semibold leading-6 text-gray-900"
          >
            {user ? (
              <div>
                {!user.first_name ? (
                  <>User</>
                ) : (
                  <>
                    {user.first_name} {user.last_name}
                  </>
                )}
              </div>
            ) : (
              <p>Log in</p>
            )}
          </a>
          {isOpen && (
            <div
              className="absolute top-[2.5rem] rounded-lg bg-white"
              onClick={logout}
            >
              <span className="hover:bg-primary block w-32 px-4 py-2 text-center hover:cursor-pointer hover:rounded-lg hover:text-white">
                Log out
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile View Sidebar */}
      <SideBar isOpen={isOpenSideBar} setIsOpen={setIsOpenSideBar} />
    </header>
  );
}
