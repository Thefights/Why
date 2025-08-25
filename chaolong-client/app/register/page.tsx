"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import ValidateField from "@/components/validate/validate-field";
import useValidation from "@/components/hooks/use-validation";
import { useFormValidity } from "@/components/hooks/use-form-validity";

export default function RegisterPage() {
  const { validateEmail, validatePassword, validatePhone, validateUserName } =
    useValidation();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const isValid = useFormValidity(
    { name, phone, email, password },
    {
      name: error.name,
      phone: error.phone,
      email: error.email,
      password: error.password,
    },
    ["name", "phone", "email", "password"] as const
  );

  const handleValidatePhone = () => {
    const { validate, error } = validatePhone(phone);
    setError((prev) => ({ ...prev, phone: validate ? "" : error }));
  };

  const handleValidateEmail = () => {
    const { validate, error } = validateEmail(email);
    setError((prev) => ({ ...prev, email: validate ? "" : error }));
  };

  const handleValidatePassword = () => {
    const { validate, error } = validatePassword(password);
    setError((prev) => ({ ...prev, password: validate ? "" : error }));
  };

  const handleValidateName = () => {
    const { validate, error } = validateUserName(name);
    setError((prev) => ({ ...prev, name: validate ? "" : error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="flex items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-md">
          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-serif text-foreground">
                Register Account
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <ValidateField
                    type="text"
                    title="Name"
                    placeholder="Enter your name"
                    error={error.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleValidateName}
                  />
                </div>

                <div className="space-y-2">
                  <ValidateField
                    type="text"
                    title="Phone Number"
                    placeholder="Enter your phone number"
                    error={error.phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={handleValidatePhone}
                  />
                </div>

                <div className="space-y-2">
                  <ValidateField
                    type="email"
                    title="Email Address"
                    placeholder="Enter your email"
                    error={error.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleValidateEmail}
                  />
                </div>

                <div className="space-y-2">
                  <ValidateField
                    type="password"
                    title="Password"
                    placeholder="Enter your password"
                    error={error.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleValidatePassword}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans"
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? "Processing..." : "Register"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
