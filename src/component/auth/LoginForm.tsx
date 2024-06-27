"use client"

// -----------------------------------------------------------------------------
// Library & Constant

import { useForm } from "@tanstack/react-form"
import { valibotValidator } from '@tanstack/valibot-form-adapter'

import client from "~/server/client"
import { schema_email, schema_password } from "#/auth/validation"

// -----------------------------------------------------------------------------
// Assets

import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/ui/card"
import { Button } from "#/ui/button"
import { Input } from "#/ui/input"
import { Label } from "#/ui/label"
import FieldInfo from "#/form/FieldInfo"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const defaultValues = { email: "", password: "" }

// —————————————————————————————————————————————————————————————————————————————
// Component

export function LoginForm() {
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues,
    validatorAdapter: valibotValidator(),
    onSubmit: async ({ value: { email, password } }) => {
      const { data, error, status } = await client.api.user.login.post({ email, password })
      if (500 <= status && status < 600) throw Error(
        (error?.value as string) ?? "Internal Server Error.",
        { cause: status, }
      )
    },
  })

  function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit()
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form className="grid gap-4" onSubmit={onLogin}>
          <section className="grid gap-2">
            <Field
              name="email"
              validators={{ onSubmit: schema_email }}
              children={(field) => <>
                <fieldset className="grid gap-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    placeholder="bob@example.com"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                  />
                </fieldset>
                <FieldInfo field={field} />
              </>}
            />
            <Field
              name="password"
              validators={{ onSubmit: schema_password }}
              children={(field) => <>
                <fieldset className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="ml-auto inline-block text-sm underline dark:hover:text-blue-400 hover:text-blue-500">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id={field.name}
                    type="password"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                  />
                </fieldset>
                <FieldInfo field={field} />
              </>}
            />
          </section>
          <Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => <>
              <Button type="submit" disabled={!canSubmit || isSubmitting} className="w-full">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </>}
          />
        </form>
        <CardFooter className="justify-center pb-0 text-sm">
          <span>
            Don't have an account?&nbsp;
            <Link href="/register" className="underline dark:hover:text-blue-400 hover:text-blue-500">Sign up</Link>
          </span>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
