import React, { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import {
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { collection, doc, getDoc } from 'firebase/firestore';
import { useToast } from "@/components/ui/use-toast";

import '../../assets/styles/login.css';

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

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    // const UserCollectionRef = collection(db, 'users');
    const [loading, setLoading] = useState(false);
    const [isNewUser, setIsNewUser] = useState(true);
    const [restForm, setRestForm] = useState(false);
    const [message, setMessage] = useState("");
    const [parent] = useAutoAnimate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                const role = idTokenResult.claims.role;
                if (isNewUser) {
                    // New user signing in for the first time, don't show "Already signed in" message
                    setIsNewUser(false);
                } else {
                    // User is already signed in, show "Already signed in" message
                    // const userDocRef = doc(UserCollectionRef, user.uid);
                    // const userDocSnap = await getDoc(userDocRef);
                    // const role = userDocSnap.data()?.role;

                    if (
                        form.getValues("email") === "" &&
                        form.getValues("password") === ""
                    ) {
                        toast({
                            title: "Already signed in",
                            description: "You are already signed in",
                        });
                    }

                    //   if (role === "admin") {
                    //     navigate("/dashboard");
                    //   } else if (role === "user") {
                    //     navigate("/");
                    //   } else {
                    //     navigate("/contact");
                    //   }
                }
            }
        });
        return () => unsubscribe();
    }, [isNewUser]);

    const handleContact = () => {
        navigate("/contact");
    };

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
    const formRest = useForm({
        resolver: zodResolver(formSchemaRest),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmitReset(values) {
        try {
            setLoading(true);
            const auth = getAuth();
            await sendPasswordResetEmail(auth, values.email)
                .then(() => {
                    toast({
                        variant: "success",
                        title: "Password reset email sent",
                        description: "Check your email to reset your password",
                    });
                    setMessage("Check your email to reset your password");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error sending password reset email:", errorMessage);
                    console.error("Error code:", errorCode);
                });
        } catch (error) {
            console.error("Error sending password reset email:", error);
            toast({
                variant: "destructive",
                title: "Error sending password reset email",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    async function onSubmit(values) {
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password,
            );
            const user = userCredential.user;

            const idTokenResult = await user.getIdTokenResult();

            const role = idTokenResult.claims.role;

            // Get the user's role
            // const userDocRef = doc(collection(db, 'users'), user.uid);
            // const userDocSnap = await getDoc(userDocRef);
            // // console.log('userDocSnap', userDocSnap.data());
            // const role = userDocSnap.data()?.role;
            // localStorage.setItem('ID', user.uid);

            // Verify the user's role
            if (role === "admin") {
                // Grant access to admin features
                // console.log('Admin signed in:', user);
                toast({
                    variant: "destructive",
                    title: "User login session",
                    description: "Admin can only login to admin dashboard",
                });
                await signOut(auth);
                navigate("/admin/login");
            } else if (role === "user") {
                // Grant access to user features
                // console.log('User signed in:', user);
                toast({
                    variant: "success",
                    title: "Signed in",
                    description: "You have successfully signed in",
                    duration: 2000,
                });
                navigate("/");
            } else {
                // Handle unknown role
                // console.error('Unknown role:', user);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Unknown role",
                    duration: 2000,
                });
                navigate("/contact");
            }
        } catch (error) {
            console.error("Error signing in:", error);
            toast({
                variant: "destructive",
                title: "Error signing in",
                description: error.message,
                duration: 2000,
            });
        } finally {
            setLoading(false);
        }
    }

    const handleFilldata = () => {
        form.setValue("email", "user@gmail.com");
        form.setValue("password", "password");
    };

    const handleResetForm = () => {
        setRestForm(!restForm);
    };
    return (

        <div className="login">
            <div className="session">
                <div className="left"></div>
                <div className="log-in">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <h4>
                                Welcome to <br /> <span className="brand">TraWay</span>
                            </h4>
                            <p>Welcome back! Log in to your track your finance</p>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="floating-label">

                                                <Input
                                                    type="email"
                                                    className="h-[50px]"
                                                    placeholder="Email"
                                                    {...field}
                                                />
                                                <label htmlFor="email">Email:</label>
                                                <div className="icon">
                                                    <svg
                                                        enableBackground="new 0 0 100 100"
                                                        version="1.1"
                                                        viewBox="0 0 100 100"
                                                        xmlSpace="preserve"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g transform="translate(0 -952.36)">
                                                            <path d="m17.5 977c-1.3 0-2.4 1.1-2.4 2.4v45.9c0 1.3 1.1 2.4 2.4 2.4h64.9c1.3 0 2.4-1.1 2.4-2.4v-45.9c0-1.3-1.1-2.4-2.4-2.4h-64.9zm2.4 4.8h60.2v1.2l-30.1 22-30.1-22v-1.2zm0 7l28.7 21c0.8 0.6 2 0.6 2.8 0l28.7-21v34.1h-60.2v-34.1z" />
                                                        </g>
                                                        <rect className="st0" width={100} height={100} fill="none" />
                                                    </svg>
                                                </div>
                                            </div>
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

                                        <FormControl>
                                            <div className="floating-label relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    className="h-[50px]"
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                                <label htmlFor="password">Password:</label>
                                                <div className="icon">
                                                    <svg
                                                        enableBackground="new 0 0 24 24"
                                                        version="1.1"
                                                        viewBox="0 0 24 24"
                                                        xmlSpace="preserve"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect className="st0" width={24} height={24} fill="none" />
                                                        <path className="st1" d="M19,21H5V9h14V21z M6,20h12V10H6V20z" />
                                                        <path
                                                            className="st1"
                                                            d="M16.5,10h-1V7c0-1.9-1.6-3.5-3.5-3.5S8.5,5.1,8.5,7v3h-1V7c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5V10z"
                                                        />
                                                        <path
                                                            className="st1"
                                                            d="m12 16.5c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5zm0-2c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5 0.5-0.2 0.5-0.5-0.2-0.5-0.5-0.5z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div
                                                    className="absolute right-4 top-4 cursor-pointer dark:text-white"
                                                    onClick={toggleShowPassword}
                                                >
                                                    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        <div>
                                            <p
                                                className="mt-1 cursor-pointer text-sm font-medium text-emerald-600 underline"
                                                onClick={handleResetForm}
                                            >
                                                Forgot password?
                                            </p>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                                <a style={{ textDecoration: "none", color: "blueviolet", marginLeft: 40 }} href="/register">Register</a>
                                <LoadingButton
                                    className="mt-6 w-full bg-emerald-600 font-bold !text-white transition-all ease-in-out hover:bg-emerald-700"
                                    loading={loading}
                                    type="submit"
                                >
                                    Login
                                </LoadingButton>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
            {/* <Dialog open={restForm} onOpenChange={handleResetForm}>
        <DialogContent>
          <DialogHeader className="mx-auto text-center">
            <div ref={parent}>
              <DialogTitle className="text-center dark:text-white">
                Forgot Password
              </DialogTitle>
              <DialogDescription>
                Enter your email address to reset your password
              </DialogDescription>
              {message && <p className="text-emerald-500">{message}</p>}
            </div>
          </DialogHeader>
          <div>
            <Form {...formRest}>
              <form
                className="space-y-8"
                onSubmit={formRest.handleSubmit(onSubmitReset)}
              >
                <FormField
                  control={formRest.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="h-[50px]"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LoadingButton
                  className="mt-6 w-full !bg-emerald-600 font-bold !text-white"
                  loading={loading}
                  type="submit"
                >
                  Reset Password
                </LoadingButton>
                <p onClick={handleResetForm} className="w-full text-center">
                  <span className="cursor-pointer underline dark:text-white">
                    I remember my password
                  </span>
                </p>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog> */}
        </div>
    );
};

export default SignIn;
