import React, { useState, useEffect, useRef } from "react";
import { posts } from "@/assets/staticData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageSquarePlus, MessagesSquare } from "lucide-react";

function Feed() {
  const [openReplyId, setOpenReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef();

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current || loading) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        if (visibleCount >= posts.length) return; // all posts loaded

        setLoading(true);

        // simulate fetch delay
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 5, posts.length));
          setLoading(false);
        }, 2000);
      }
    }

    const current = containerRef.current;
    if (current) {
      current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visibleCount, loading]);

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div
      ref={containerRef}
      className="h-[700px] overflow-y-auto flex flex-col items-center justify-start"
    >
      <Card className="w-full border-none shadow-none">
        <CardContent className="space-y-6">
          {visiblePosts.map((post) => {
            const isOpen = openReplyId === post.id;

            return (
              <Card key={post.id} className="w-full rounded-2xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm text-gray-800">Username</p>
                </div>

                <CardHeader className="px-0">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {post.content}
                  </CardDescription>
                </CardHeader>

                <Separator />

                <Collapsible
                  open={isOpen}
                  onOpenChange={() => setOpenReplyId(isOpen ? null : post.id)}
                >
                  <CardFooter className="flex justify-between items-center px-0">
                    <div className="flex items-center space-x-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MessageSquarePlus className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Post a Reply</DialogTitle>
                            <DialogDescription>
                              Share your thoughts on this topic.
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                console.log("Reply posted:", replyText);
                                setReplyText("");
                              }}
                            >
                              Submit Reply
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setOpenReplyId(isOpen ? null : post.id)
                          }
                        >
                          <MessagesSquare className="h-4 w-4 mr-1" />
                          View Replies
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </CardFooter>

                  <CollapsibleContent className="space-y-2 mt-3">
                    {post.replies && post.replies.length > 0 ? (
                      post.replies.map((reply, rIndex) => (
                        <div
                          key={rIndex}
                          className="rounded-md border px-3 py-2 text-sm text-gray-700 bg-gray-50"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="User avatar"
                              />
                              <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <p className="font-medium text-sm text-gray-800">
                              Username
                            </p>
                          </div>
                          <div className="pl-12 py-2 text-sm text-gray-700 bg-gray-50">
                            {reply}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No replies yet.</p>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}

          {/* Loading indicator */}
          {loading && <Loader2 className="h-8 w-8 animate-spin mx-auto" />}
        </CardContent>
      </Card>
    </div>
  );
}

export default Feed;
