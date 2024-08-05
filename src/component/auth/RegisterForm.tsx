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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/ui/card"
import { Button } from "#/ui/button"
import { Input } from "#/ui/input"
import { Label } from "#/ui/label"
import FieldInfo from "#/form/FieldInfo"

// —————————————————————————————————————————————————————————————————————————————
// Environment

async function mutationFn() {
  const { data, error, status } = await client.api.user.create.post({
    email: "sara@gmail.com",
    password: "password"
  })
  if (500 <= status && status < 600) throw Error(
    (error?.value as string) ?? "Internal Server Error.",
    { cause: status, }
  )
  return data
}

const retry = (failed: number, { cause }: Error) => failed < 2
  && typeof cause === "number"
  && 500 <= cause && cause < 600

const defaultValues = { email: "", password: "" }

// —————————————————————————————————————————————————————————————————————————————
// Component

export function RegisterForm() {
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues,
    validatorAdapter: valibotValidator(),
    onSubmit: async ({ value: { email, password } }) => {
      const { data, error, status } = await client.user.create.post({ email, password })
      if (500 <= status && status < 600) throw Error(
        (error?.value as string) ?? "Internal Server Error.",
        { cause: status }
      )
    },
  })

  function onRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit()
  }

  return (
    <Card className="mx-auto min-w-[24rem] max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onRegister} className="grid gap-4">
          <div className="grid gap-2">
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
              validators={{ onBlur: schema_password }}
              children={(field) => <>
                <fieldset className="grid gap-2">
                  <Label htmlFor={field.name}>Password</Label>
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
          </div>
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => <>
              <Button type="submit" className="w-full" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? "Creating..." : "Create an account"}
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button>
            </>}
          />
        </form>
        <footer className="mt-4 text-center text-sm">
          Already have an account?&nbsp;
          <Link href="./login" className="underline hover:text-blue-500 dark:hover:text-blue-400">
            Log in
          </Link>
        </footer>
      </CardContent>
    </Card>
  )
}