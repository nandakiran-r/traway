import React, { useEffect, useState } from "react";
import { auth,db } from "@/config/firebase";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword, 
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loading-button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useUser } from "@/context/UserContext";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const formSchemaRest = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [restForm, setRestForm] = useState(false);
  const [message, setMessage] = useState("");
  const [parent] = useAutoAnimate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const formRest = useForm({
  //   resolver: zodResolver(formSchemaRest),
  //   defaultValues: {
  //     email: "",
  //   },
  // });

  // async function onSubmitReset(values) {
  //   try {
  //     setLoading(true);
  //     const auth = getAuth();
  //     await sendPasswordResetEmail(auth, values.email)
  //       .then(() => {
  //         toast({
  //           variant: "success",
  //           title: "Password reset email sent",
  //           description: "Check your email to reset your password",
  //         });
  //         setMessage("Check your email to reset your password");
  //       })
  //       .catch((error) => {
  //         console.error("Error sending password reset email:", error.message);
  //       });
  //   } catch (error) {
  //     console.error("Error sending password reset email:", error);
  //     toast({
  //       variant: "destructive",
  //       title: "Error sending password reset email",
  //       description: error.message,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function onSubmit(values) {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
  
      // Save user info in Firestore under 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        role: "user", // Default role, modify as needed
      });
  
      toast({
        variant: "success",
        title: "Signed up",
        description: "Account successfully created!",
        duration: 2000,
      });
  
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: error.message,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  }

  const handleResetForm = () => {
    setRestForm(!restForm);
  };

  return (
    <div className="flex h-full max-h-screen min-h-[600px] flex-col items-center justify-around gap-10">
    
      <div className="flex w-full max-w-[320px] flex-col gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="h-[50px] !text-white"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="h-[50px] !text-white"
                        placeholder="Password"
                        {...field}
                      />
                      <div
                        className="absolute right-4 top-4 cursor-pointer dark:text-white"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              className="mt-6 w-full bg-emerald-600 font-bold !text-white transition-all ease-in-out hover:bg-emerald-700"
              loading={loading}
              type="submit"
            >
              Sign Up
            </LoadingButton>
          </form>
        </Form>
      </div>


    </div>
  );
};

export default SignUp;