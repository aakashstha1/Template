import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon, Mail, Phone, User2 } from "lucide-react";
import { HashLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { toast } from "sonner";

function CreatePost() {
  //   const [loading, setLoading] = useState(false);
  //   const [inputs, setInputs] = useState({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     bio: "",
  //     imageUrl: "",
  //   });
  //   const [file, setFile] = useState(null);
  //   const fileInputRef = useRef();
  //   const API_URL = import.meta.env.VITE_API_URL;

  //   // Fetch user profile
  //   useEffect(() => {
  //     const fetchProfile = async () => {
  //       try {
  //         const res = await axios.get(`${API_URL}/user/profile`, {
  //           withCredentials: true,
  //         });
  //         setInputs(res?.data.user);
  //         setOriginalProfile(res?.data.user);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchProfile();
  //   }, [API_URL]);

  //   const handleChange = (e) => {
  //     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   };

  //   const handleCancel = () => {
  //     if (originalProfile) {
  //       setInputs(originalProfile);
  //       setFile(null); // optional: clear selected file
  //     }
  //   };

  //   const handleFileChange = (e) => {
  //     const selected = e.target.files[0];
  //     setFile(selected);
  //     setInputs((prev) => ({
  //       ...prev,
  //       imageUrl: URL.createObjectURL(selected),
  //     }));
  //   };

  //   const handleImageClick = () => {
  //     fileInputRef.current.click();
  //   };

  //   const handleSave = async () => {
  //     try {
  //       setLoading(true);
  //       const formData = new FormData();

  //       formData.append("name", inputs.name);
  //       formData.append("phone", inputs.phone);
  //       formData.append("bio", inputs.bio);

  //       if (file) {
  //         formData.append("imageUrl", file);
  //       }

  //       const res = await axios.put(`${API_URL}/user/profile/update`, formData, {
  //         withCredentials: true,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });

  //       toast.success(res?.data.message || "Profile Updated succesfully");
  //     } catch (error) {
  //       console.error(error);
  //       toast.error(error?.response?.data.message || "Failed to update Profile!");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const loading = false;

  return (
    <div className="w-96 p-6 flex items-center justify-center sticky top-5 z-10">
      <Card className="w-full rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Introduction to React"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              type="text"
              row={5}
              placeholder="e.g. Introduction to React"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button disabled={loading} className="w-full">
            {loading ? <HashLoader size={20} color="white" /> : "Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreatePost;
