/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { ComponentProps, ReactNode, Ref, useEffect, useState } from "react"
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Textarea,
  useColorModeValue,
  forwardRef,
} from "@chakra-ui/react"

import { isEmpty, omit } from "lodash"

// import StyledInputTags from "@/components/StyledInputTags.tsxx";
// import { InputTypeDropzone } from "./InputTypeDropzone"

import MessageBox from "../MessageBox"
import { capitalize } from "app/core/utils"
import { HintBox } from "../Box"
import { LightButton } from "../Buttons"
import { useFormContext } from "react-hook-form"

// Dynamic imports: this components have a huge impact on bundle size and are externalized
// We use the DYNAMIC_IMPORT env variable to skip dynamic while using Jest

export interface FieldGroupProps extends InputProps {
  label?: string
  help?: string
  pre?: string
  post?: string
  after?: string
  button?: ReactNode
  error?: string
  precision?: number
  name: string
  onChange?: (a?: any, b?: any) => void
}

export interface InputFieldProps extends FieldGroupProps {
  component?: ReactNode
  render?: ReactNode
  description?: string
  timeFormat?: string
  multiple?: boolean
  required?: boolean
  closeOnSelect?: boolean
  disabled?: boolean
  focus?: boolean
  validation?: any
  set?: Function
  step?: number | string | any
  context?: ComponentProps<typeof Object>
  style?: ComponentProps<typeof Object>
  options?: [ComponentProps<typeof Object>] | ComponentProps<typeof Object>
  value?: string | number | ComponentProps<typeof Object> | []
  defaultValue?: string | number | boolean | ComponentProps<typeof Object> | []
  // onChange: Function,
  validate?: ComponentProps<typeof Object>
  validate2?: Function
  min?: number
  max?: number
  charCount?: number
  maxLength?: number
}

const FieldGroup = function FieldGroup({
  className,
  isRequired,
  label,
  help,
  pre,
  post,
  button,
  ...props
}: FieldGroupProps) {
  const inputProps = { ...props }

  const color = useColorModeValue("gray.600", "gray.200")
  const { errors, register } = useFormContext()

  const ownProps = omit(inputProps, [
    "step",
    "isInvalid",
    "defaultValue",
    "min",
    "size",
    "isDisabled",
    "type",
  ])

  const name = inputProps.name!

  const error = Array.isArray(errors[inputProps.name])
    ? errors[inputProps.name].join(", ")
    : errors[inputProps.name]?.message || errors[inputProps.name]

  let isInvalid = false
  if (props.isInvalid) isInvalid = true
  if (error) {
    isInvalid = true
  }

  return (
    <FormControl isDisabled={props.isDisabled} isInvalid={isInvalid} mb={6}>
      {label && (
        <FormLabel fontWeight="bold">
          {label}{" "}
          {isRequired && (
            <Box as="span" color="red.500">
              *
            </Box>
          )}
        </FormLabel>
      )}
      {help && (
        <MessageBox withIcon type="info" mb={2} color="gray.800">
          {help}
        </MessageBox>
      )}
      <InputGroup>
        {pre && (
          <InputLeftAddon h="3.125rem" borderLeftRadius="10px" borderColor="gray.200" color={color}>
            {pre}
          </InputLeftAddon>
        )}
        {inputProps.type === "number" && (
          <NumberInput
            w="full"
            step={+inputProps.step!}
            defaultValue={+inputProps.defaultValue!}
            min={+inputProps.min!}
            isDisabled={inputProps.isDisabled}
            precision={inputProps.precision && +inputProps.precision}
          >
            <NumberInputField
              h="3.125rem"
              borderRightRadius={pre && "10px"}
              borderRadius={pre ? undefined : "10px"}
              bg="white"
              ref={register}
              color={color}
              borderColor="gray.200"
              {...ownProps}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
        {inputProps.type !== "number" && (
          <Input
            h="3.125rem"
            borderRightRadius={pre && "10px"}
            borderRadius={pre ? undefined : "10px"}
            bg="white"
            ref={register}
            color={color}
            borderColor="gray.200"
            {...inputProps}
          />
        )}

        {post && (
          <InputRightAddon
            h="3.125rem"
            borderLeftRadius="10px"
            borderColor="gray.200"
            color={color}
          >
            {post}
          </InputRightAddon>
        )}
      </InputGroup>
      {error && errors[name]?.type !== "required" && (
        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
      )}
      {errors && errors[name]?.type === "required" && (
        <FormErrorMessage>
          {!isEmpty(errors[name].message) ? errors[name].message : "This input field is required"}
        </FormErrorMessage>
      )}
      {button && <LightButton>{button}</LightButton>}
    </FormControl>
  )
}

export const InputField = function InputField({ isRequired, ...props }: InputFieldProps) {
  const [state, setState] = useState({
    value: props.value,
    validationState: undefined,
  })

  const color = useColorModeValue("gray.600", "gray.200")

  const {
    register,
    formState: { isSubmitting },
    errors,
  } = useFormContext()

  const error = Array.isArray(errors[props.name])
    ? errors[props.name].join(", ")
    : errors[props.name]?.message || errors[props.name]

  //didUpdate oldprops
  useEffect(() => {
    const nvalue = props.value
    setState({ ...state, value: nvalue })
  }, [props.value, state])

  const required = props.validate

  // validation effect

  useEffect(() => {
    if (props.type === "currency") {
      props.validation({ name: props.name }, { ...required })
    }
  }, [props, required])

  //   function validate(value) {
  //     if (!value) {
  //       return !props.required
  //     }
  //     const type = props.type || "text"
  //     if (props.validate2 && !type.match(/^date/)) {
  //       return props.validate2(value)
  //     }
  //     switch (props.type) {
  //       case "email":
  //         return value.match(
  //           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //         )
  //     }
  //     return true
  //   }

  //   function roundCurrencyValue(value) {
  //     if (value === null) {
  //       return null
  //     } else if (get(props.options, "step") === 1) {
  //       // Value must be an increment of 1, truncate the two last digits
  //       return Math.trunc(value / 100) * 100
  //     }
  //     return value
  //   }

  //   function handleChange(value) {
  //     const { type, step } = props
  //     if (type === "number") {
  //       const parsed = step && parseFloat(step) !== 1 ? parseFloat(value) : parseInt(value)
  //       value = isNaN(parsed) ? null : parsed
  //     } else if (type === "currency") {
  //       value = roundCurrencyValue(value)

  //       field.set && field.set(field.name, value)
  //     }

  //     if (validate(value)) {
  //       setState((p) => ({ ...p, validationState: null }))
  //     } else {
  //       setState((p) => ({ ...p, validationState: "error" }))
  //     }

  //     setState((p) => ({ ...p, value }))

  //     // props.onChange(value);
  //   }

  const field = props
  let value = state.value
  let input: ReactNode

  let isInvalid = false
  if (props.isInvalid) isInvalid = true
  if (field.error) isInvalid = true
  if (error) isInvalid = true

  switch (props.type) {
    case "textarea": {
      value = value || props.defaultValue || ""
      if (field.charCount) {
        if (field.maxLength) {
        } else {
        }
      }

      input = (
        <FormControl isInvalid={isInvalid} isDisabled={field.isDisabled ?? isSubmitting} mb={6}>
          <>
            {field.label && (
              <FormLabel fontWeight="bold">
                {`${capitalize(field.label)}`}
                {isRequired && (
                  <Box as="span" color="red.500">
                    *
                  </Box>
                )}
              </FormLabel>
            )}
            <Textarea
              ref={register}
              placeholder={props.placeholder}
              borderRadius={1}
              name={field.name}
              maxLength={field.maxLength}
              defaultValue={field.value || field.defaultValue || ""}
              borderLeftRadius="10px"
              borderColor="gray.200"
              color={color}
            />
            {errors?.[field.name]?.type !== "required" && (
              <FormErrorMessage>{error}</FormErrorMessage>
            )}
            {errors?.[field.name]?.type === "required" && (
              <FormErrorMessage>This input field is required</FormErrorMessage>
            )}
            {field.description && <HintBox>{field.description}</HintBox>}
          </>
        </FormControl>
      )
      break
    }

    case "render": {
      input = <>{field.render}</>
      break
    }

    // case "dropzone": {
    //   input = (
    //     <FormControl isInvalid={isInvalid} isDisabled={field.isDisabled ?? isSubmitting} mb={6}>
    //       <>
    //         {field.label && (
    //           <FormLabel fontWeight="bold">
    //             {`${capitalize(field.label)}`}
    //             {isRequired && (
    //               <Box as="span" color="red.500">
    //                 *
    //               </Box>
    //             )}
    //           </FormLabel>
    //         )}
    //         <InputTypeDropzone
    //           ref={register}
    //           set={field.set}
    //           validation={field.validation}
    //           name={field.name}
    //           value={field.value}
    //           required={field.required}
    //           defaultValue={field.defaultValue}
    //           onChange={(event) => handleChange(event)}
    //           options={field.options}
    //         />
    //         {field.description && <HintBox>{field.description}</HintBox>}
    //       </>
    //     </FormControl>
    //   )
    //   break
    // }

    case "select": {
      if (!field.options || field.options.length === 0) {
        console.warn(">>> InputField: options.length needs to be >= 1", field.options)
        return null
      }

      const firstOptionValue =
        field.options[0].value !== undefined
          ? field.options[0].value
          : Object.keys(field.options[0])[0]

      input = (
        <FormControl isInvalid={isInvalid} isDisabled={field.isDisabled ?? isSubmitting} mb={6}>
          <>
            {field.label && (
              <FormLabel fontWeight="bold">
                {`${capitalize(field.label)}`}
                {isRequired && (
                  <Box as="span" color="red.500">
                    *
                  </Box>
                )}
              </FormLabel>
            )}
            <Select
              key={`${field.name}-${firstOptionValue}`} // make sure we instantiate a new component if first value changes
              ref={register}
              isDisabled={field.isDisabled ?? isSubmitting}
              name={field.name}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue || firstOptionValue}
              // multiple={field.multiple}
              h="3.125rem"
              borderColor="gray.200"
              borderRadius="10px"
            >
              {field.options &&
                field.options.map((option, index) => {
                  const value = option.value !== undefined ? option.value : ""
                  const label = option.label || option[value]
                  return (
                    <option key={`${index}-${value}`} value={value}>
                      {label}
                    </option>
                  )
                })}
            </Select>
            {errors?.[field.name]?.type !== "required" && (
              <FormErrorMessage>{error}</FormErrorMessage>
            )}
            {errors[field.name]?.type === "required" && (
              <FormErrorMessage>This input field is required</FormErrorMessage>
            )}
            {field.description && <HintBox>{field.description}</HintBox>}
          </>
        </FormControl>
      )
      break
    }

    case "radio": {
      input = (
        <FormControl
          as={Flex}
          justify="space-between"
          isInvalid={isInvalid}
          isDisabled={field.isDisabled ?? isSubmitting}
          mb={6}
        >
          {field.label && (
            <FormLabel fontWeight="bold">
              {`${capitalize(field.label)}`}
              {isRequired && (
                <Box as="span" color="red.500">
                  *
                </Box>
              )}
            </FormLabel>
          )}
          {props.options && (
            <RadioGroup
              id={field.name}
              colorScheme="blue"
              name={field.name}
              defaultValue={field.defaultValue}
            >
              <HStack spacing={4}>
                {field.options &&
                  field.options.map((option, index) => {
                    const value = option.value !== undefined ? option.value : ""
                    const label = option.label || option[value]
                    return (
                      <Radio
                        isDisabled={field.isDisabled ?? isSubmitting}
                        borderColor="blue.500"
                        key={`${index}-${value}`}
                        ref={register}
                        value={value}
                        size="lg"
                      >
                        {capitalize(label)}{" "}
                      </Radio>
                    )
                  })}
              </HStack>
            </RadioGroup>
          )}
        </FormControl>
      )
      break
    }

    case "checkbox": {
      input = (
        <FormControl
          as={Flex}
          justify="space-between"
          align="center"
          isInvalid={isInvalid}
          isDisabled={field.isDisabled ?? isSubmitting}
          mb={6}
        >
          {props.options ? (
            <>
              {field.label && (
                <FormLabel fontWeight="bold">
                  {`${capitalize(field.label)}`}
                  {isRequired && (
                    <Box as="span" color="red.500">
                      *
                    </Box>
                  )}
                </FormLabel>
              )}
              <CheckboxGroup defaultValue={props.defaultValue}>
                <HStack spacing={4}>
                  {field.options &&
                    field.options.map((option, index) => {
                      const value = option.value !== undefined ? option.value : ""
                      const label = option.label || option[value]
                      return (
                        <Checkbox
                          key={`${index}-${value}`}
                          id={field.name}
                          isDisabled={field.isDisabled ?? isSubmitting}
                          ref={register}
                          name={field.name}
                          value={value}
                          size="lg"
                          borderColor="blue.500"
                        >
                          {capitalize(label)}
                        </Checkbox>
                      )
                    })}
                </HStack>
              </CheckboxGroup>
              {errors[field.name]?.type !== "required" && (
                <FormErrorMessage>{error}</FormErrorMessage>
              )}
              {errors[field.name]?.type === "required" && (
                <FormErrorMessage>This input field is required</FormErrorMessage>
              )}
            </>
          ) : (
            <>
              <Checkbox
                ref={register}
                borderRadius={1}
                isDisabled={field.isDisabled ?? isSubmitting}
                fontWeight="bold"
                name={field.name}
                size="lg"
                borderColor="blue.500"
                defaultIsChecked={field.defaultValue}
              >
                {field.label && capitalize(field.label)}
              </Checkbox>
              {errors[field.name]?.type !== "required" && (
                <FormErrorMessage>{error}</FormErrorMessage>
              )}
              {errors[field.name]?.type === "required" && (
                <FormErrorMessage>This input field is required</FormErrorMessage>
              )}
              {field.description && <HintBox>{field.description}</HintBox>}
            </>
          )}
        </FormControl>
      )
      break
    }

    case "switch": {
      input = (
        <FormControl
          as={Flex}
          justify="space-between"
          align="center"
          isInvalid={isInvalid}
          isDisabled={field.isDisabled ?? isSubmitting}
          mb={6}
        >
          {field.label && (
            <FormLabel fontWeight="bold">
              {`${capitalize(field.label)}`}
              {isRequired && (
                <Box as="span" color="red.500">
                  *
                </Box>
              )}
            </FormLabel>
          )}
          <Switch
            name={field.name}
            ref={register}
            isDisabled={field.isDisabled ?? isSubmitting}
            colorScheme="blue"
            size="lg"
            defaultIsChecked={field.defaultValue}
          />
          {errors[field.name]?.type !== "required" && <FormErrorMessage>{error}</FormErrorMessage>}
          {errors[field.name]?.type === "required" && (
            <FormErrorMessage>This input field is required</FormErrorMessage>
          )}
          {field.description && <HintBox>{field.description}</HintBox>}
        </FormControl>
      )
      break
    }

    default: {
      input = (
        <FieldGroup
          type={field.type}
          pre={field.pre}
          post={field.post}
          button={field.button}
          name={field.name}
          maxLength={field.maxLength}
          isDisabled={field.isDisabled ?? isSubmitting}
          isInvalid={state.validationState}
          isRequired={isRequired}
          label={field.label && `${capitalize(field.label)}`}
          help={field.description}
          placeholder={field.placeholder}
          className={field.className}
          defaultValue={field.value || field.defaultValue || ""}
          step={field.step}
          min={field.min}
          max={field.max}
        />
      )
      break
    }
  }

  return <Box className={`InputField ${field.name}${field.type}`}>{input}</Box>
}
