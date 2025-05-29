import React from "react";
import { Button } from "./ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const getNavLinkClass = (isActive) =>
    isActive
      ? "text-amber-400 font-semibold border-b-2 border-amber-500 pb-1"
      : " hover:text-indigo-600";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav id="top">
      <div className="max-w-7xl mx-auto mt-3 flex items-center justify-between shadow-lg px-4 py-3 rounded-full float-delay bg-sky-50">
        {/* Left  */}
        <div className="">
          <h1 className="text-3xl font-semibold">Logo</h1>
        </div>
        {/* middle  */}
        <div className="flex items-center gap-6 ">
          <NavLink
            to="/"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="/discussion"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Discussion
          </NavLink>{" "}
          {/* <NavLink
            to="/contact"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Contact
          </NavLink> */}
        </div>
        {/* right  */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus-visible:outline-0">
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-30">
                <NavLink to="profile">
                  <DropdownMenuItem>
                    <User />
                    Profile
                  </DropdownMenuItem>
                </NavLink>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
