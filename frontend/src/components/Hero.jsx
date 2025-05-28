import React from "react";
import Lottie from "lottie-react";
import heroAnimation from "@/assets/lottie/hero.json";
import { Input } from "./ui/input";
import { ArrowRightCircleIcon, Search } from "lucide-react";
import { Button } from "./ui/button";
function Hero() {
  return (
    <div className="w-full h-[350px] flex items-center justify-between overflow-hidden">
      {/* Text  */}
      <div className="w-2/3 p-8 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
        <p className="text-gray-600 text-sm max-w-md">
          Discover amazing content and explore new opportunities with us. Use
          the search below to get started.
        </p>
        <div className="flex items-center justify-between gap-2 w-[600px]">
          <Input type="text" placeholder="Search..." />
          <Button>
            {" "}
            <Search /> Search
          </Button>
        </div>

        <Button className="mx-auto mt-5 bg-blue-600 hover:bg-blue-700 transition w-40 flex items-center justify-center gap-2">
          Explore More <ArrowRightCircleIcon className="w-10 h-10" />
        </Button>
      </div>

      {/* Image  */}
      <div className="w-1/3 flex items-center justify-center">
        <Lottie
          animationData={heroAnimation}
          loop={true}
          className="w-full h-70"
        />
      </div>
    </div>
  );
}

export default Hero;
