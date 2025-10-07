import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroCampus from "@/assets/hero-campus.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Admin authentication
    if (email === "admin@vnrvjiet.in" && password === "sai@123") {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", email);
      toast({
        title: "Success!",
        description: "Logged in as Admin",
      });
      setTimeout(() => navigate("/"), 1000);
      return;
    }

    // Candidate authentication - pattern: 2x070a0xxx@vnrvjiet.in
    const candidatePattern = /^2\d070a0\d{3}@vnrvjiet\.in$/i;
    if (candidatePattern.test(email)) {
      localStorage.setItem("userRole", "candidate");
      localStorage.setItem("userEmail", email);
      toast({
        title: "Success!",
        description: "Logged in as Candidate",
      });
      setTimeout(() => navigate("/"), 1000);
      return;
    }

    // Invalid credentials
    toast({
      title: "Invalid Credentials",
      description: "Please check your email and password and try again",
      variant: "destructive",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{
        backgroundImage: `url(${heroCampus})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 gradient-tech opacity-90"></div>
      
      <Card className="w-full max-w-md relative z-10 shadow-lg hover-glow animate-scale-in backdrop-blur-sm bg-background/95 border-primary/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-tech animate-pulse">
              <LogIn className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to access the VNR VJIET Event Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@vnrvjiet.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-300 focus:shadow-glow border-primary/30 focus:border-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-300 focus:shadow-glow border-primary/30 focus:border-primary"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300 shadow-glow text-lg font-semibold"
              size="lg"
            >
              Sign In
            </Button>

            {/* Helper Text */}
            <p className="text-sm text-center text-muted-foreground mt-4">
              Admin: admin@vnrvjiet.in | Candidate: 2x070a0xxx@vnrvjiet.in
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
