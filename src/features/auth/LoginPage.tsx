import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Zap, Eye, EyeOff } from "lucide-react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          username,
          password,
        }
      );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate({
        to: "/dashboard",
      });

    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Invalid username or password.");
      } else {
        alert("Unable to login. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-6">
      <Card className="w-full max-w-md shadow-xl border">
        <CardContent className="p-8">

          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center">
            EcoGrid
          </h1>

          <p className="text-muted-foreground text-center mt-2 mb-8">
            Smart Building Energy Platform
          </p>

          <div className="space-y-5">

            <div>
              <Label>Username</Label>

              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </div>

            <div>
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline"
              >
                Register
              </Link>
            </div>

          </div>

        </CardContent>
      </Card>
    </div>
  );
}