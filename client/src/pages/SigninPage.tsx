import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import signinPic from "@/assets/signinPic.jpg"; // Importing local image

export function SignIn() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In Data:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      {/* Left Section - Sign In Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 h-screen flex justify-center items-center"
      >
        <Card className="w-[400px] bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl font-bold">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                className="bg-transparent border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-white"
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-white"
                onChange={handleChange}
                required
              />
              <Button type="submit" className="w-full bg-slate-950 text-white hover:bg-slate-800">
                Sign In
              </Button>
            </form>
            <p className="text-center text-white/70 mt-4">
              Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex w-1/2 h-screen justify-center items-center"
      >
        <img
          src={signinPic}
          alt="Sign In"
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>
    </div>
  );
}

