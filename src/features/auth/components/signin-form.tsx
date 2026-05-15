"use client";

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
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const initialDraft = {
  email: "",
  password: "",
};

export function SignInForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [draft, setDraft] = useState(initialDraft);

  async function handleSubmit() {
    console.log({ draft });
    const result = await authClient.signIn.email(
      {
        email: draft.email, // user email address
        password: draft.password, // user password -> min 8 characters by default
      },
      {
        onRequest: (ctx) => {
          //show loading
          // return <p>loading...</p>
          console.log("onRequest");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log("onSuccess");
        },
        onError: (ctx) => {
          // display the error message
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
        <CardTitle>Sign In to Your Account</CardTitle>
        <CardDescription>
          Enter your information below to signin to your account
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
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">Sign in</Button>

                <Button variant="outline" type="button">
                  Sign in with Google
                </Button>

                <FieldDescription className="px-6 text-center">
                  Dont have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
