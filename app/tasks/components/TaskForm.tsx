import * as z from "zod"
import React from "react"

import { Form, FormProps } from "app/core/components/Form"
import { InputField } from "app/core/components/input"
export { FORM_ERROR } from "app/core/components/Form"

export function TaskForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <InputField name="name" label="Name" placeholder="Name" />
    </Form>
  )
}
