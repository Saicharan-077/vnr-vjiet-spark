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
      className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroCampus})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <Card className="w-full max-w-md relative z-10 border-primary/30 shadow-2xl hover-glow animate-scale-in backdrop-blur-xl bg-card/80">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary border-2 border-primary/50 shadow-lg">
                <LogIn className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {isSignUp ? "Join VNR VJIET Event Management" : "Access your events dashboard"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@vnrvjiet.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 transition-all duration-300 focus:shadow-glow border-primary/40 focus:border-primary bg-background/50 backdrop-blur-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 transition-all duration-300 focus:shadow-glow border-primary/40 focus:border-primary bg-background/50 backdrop-blur-sm"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-8 bg-gradient-to-r from-primary via-accent to-primary hover:shadow-glow transition-all duration-500 text-lg font-bold relative overflow-hidden group"
              size="lg"
            >
              <span className="relative z-10">{loading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>

            {/* Toggle Sign Up/Sign In */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm font-medium text-primary hover:text-accent transition-colors duration-300 hover:underline"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Helper Text */}
            <div className="pt-4 border-t border-primary/20">
              <p className="text-xs text-center text-muted-foreground space-y-1">
                <span className="block font-semibold text-primary">Admin Credentials:</span>
                <span className="block">Email: admin@vnrvjiet.in</span>
                <span className="block">Password: sai@123</span>
                <span className="block mt-3 font-semibold text-accent">Candidate Format:</span>
                <span className="block">2x070a0xxx@vnrvjiet.in</span>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
