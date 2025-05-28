import Content from "@/components/Content";
import EditProfile from "@/components/EditProfile";
import React from "react";
import CreatePost from "./CreatePost";
import Feed from "./Feed";

function DiscussionForum() {
  return (
    <div className="max-w-7xl mx-auto flex">
      <div className="w-[400px] ">
        <CreatePost />
      </div>
      <div className="w-full">
        <Feed />
      </div>
    </div>
  );
}

export default DiscussionForum;
