import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroCampus from "@/assets/hero-campus.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) navigate("/");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Validate email patterns
    const adminEmail = "admin@vnrvjiet.in";
    const candidatePattern = /^2\d070a0\d{3}@vnrvjiet\.in$/i;

    if (email !== adminEmail && !candidatePattern.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please use a valid VNR VJIET email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        if (data.user) {
          // Assign role
          const role = email === adminEmail ? "admin" : "candidate";
          const { error: roleError } = await supabase
            .from("user_roles")
            .insert({ user_id: data.user.id, role });

          if (roleError) console.error("Role assignment error:", roleError);

          toast({
            title: "Success!",
            description: `Account created as ${role}`,
          });
          setTimeout(() => navigate("/"), 1000);
        }
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id)
            .single();

          toast({
            title: "Success!",
            description: `Logged in as ${roleData?.role || 'user'}`,
          });
          setTimeout(() => navigate("/"), 1000);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-base">
            {isSignUp ? "Join the VNR VJIET Event Management System" : "Sign in to access the VNR VJIET Event Management System"}
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
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300 shadow-glow text-lg font-semibold"
              size="lg"
            >
              {loading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
            </Button>

            {/* Toggle Sign Up/Sign In */}
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Helper Text */}
            <p className="text-sm text-center text-muted-foreground mt-2">
              Admin: admin@vnrvjiet.in (password: sai@123)<br />
              Candidate: 2x070a0xxx@vnrvjiet.in
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
