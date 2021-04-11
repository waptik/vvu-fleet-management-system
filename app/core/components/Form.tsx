import { FormErrorMessage } from "@chakra-ui/form-control"
import { Box } from "@chakra-ui/layout"
import { useState, ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormOptions } from "react-hook-form"
import * as z from "zod"
import { FormList } from "./Box"

import { SubmitBtn } from "./Buttons"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  loading?: boolean
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormOptions<z.infer<S>>["defaultValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  loading = false,
  onSubmit,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: async (values) => {
      try {
        if (schema) {
          schema.parse(values)
        }
        return { values, errors: {} }
      } catch (error) {
        return { values: {}, errors: error.formErrors?.fieldErrors }
      }
    },
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <>
      <FormProvider {...ctx}>
        <Box
          as="form"
          // align={undefined}
          onSubmit={ctx.handleSubmit(async (values) => {
            const result = (await onSubmit(values)) || {}
            for (const [key, value] of Object.entries(result)) {
              if (key === FORM_ERROR) {
                setFormError(value)
              } else {
                ctx.setError(key as any, {
                  type: "submit",
                  message: value,
                })
              }
            }
          })}
          {...props}
        >
          {/* Form fields supplied as children are rendered here */}

          <FormList>{children}</FormList>

          {formError && <FormErrorMessage>{formError}</FormErrorMessage>}

          {submitText && (
            <SubmitBtn
              loading={loading}
              isDisabled={ctx.formState.isSubmitting}
              submitBtnLabel={submitText}
            />
          )}
        </Box>
      </FormProvider>
    </>
  )
}

export default Form
