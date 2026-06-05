"use client";

import { AsyncButton } from "@/components/ui/async-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialDraft = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [draft, setDraft] = useState(initialDraft);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    console.log({ draft });
    const result = await authClient.signUp.email(
      {
        email: draft.email, // user email address
        password: draft.password, // user password -> min 8 characters by default
        name: draft.name, // user display name
        // image, // User image URL (optional)
        // callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          // return <p>loading...</p>
          setIsLoading(true);
          console.log("onRequest");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          setIsLoading(false);
          router.push("/");
        },
        onError: (ctx) => {
          // display the error message
          setIsLoading(false);
          console.log(ctx.error);
          alert(ctx.error.message);
        },
      },
    );
    console.log({ result });
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={draft.password}
                onChange={(e) =>
                  setDraft({ ...draft, password: e.target.value })
                }
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                value={draft.confirmPassword}
                onChange={(e) =>
                  setDraft({ ...draft, confirmPassword: e.target.value })
                }
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <AsyncButton
                  isLoading={isLoading}
                  loadingText="Submitting"
                  type="submit"
                >
                  Create Account
                </AsyncButton>

                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link href={ROUTES.auth.signin.path}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
