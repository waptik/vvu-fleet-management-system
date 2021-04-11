import * as React from "react"
import { Box, Button, ButtonProps, LightMode, Spinner } from "@chakra-ui/react"
import { FaArrowCircleRight } from "react-icons/fa"

import { StyledLink } from "./Link"

export interface RoundedButtonOptionProps {
  loading?: boolean | any
}

export interface RoundedButtonProps extends ButtonProps, RoundedButtonOptionProps {
  // onClick?: (a?: any, b?: any) => void | any
}

export const LightButton = (props: RoundedButtonProps) => {
  return (
    <LightMode>
      <Button {...props} />
    </LightMode>
  )
}

export function GetStartedButton() {
  return (
    <StyledLink href="/join">
      <Button
        fontSize="xl"
        size="lg"
        colorScheme="blue"
        px={10}
        rightIcon={<Box as={FaArrowCircleRight} boxSize={6} />}
      >
        Get Started for Free
      </Button>
    </StyledLink>
  )
}

export const StyledButtonContent = ({ colorScheme, ...props }: RoundedButtonProps) => {
  return (
    <LightButton
      rounded="lg"
      letterSpacing="-0.4px"
      _disabled={{
        cursor: "not-allowed",
      }}
      fontWeight="medium"
      outline="0"
      border="1px solid"
      colorScheme={colorScheme ? colorScheme : "blue"}
      css={{
        svg: {
          verticalAlign: "middle",
        },
      }}
      {...props}
    />
  )
}

export const RoundedButton = (props: RoundedButtonProps) => {
  const { loading, ...rest } = props
  return !loading ? (
    <StyledButtonContent {...rest} />
  ) : (
    <StyledButtonContent {...rest} onClick={undefined}>
      <Spinner boxSize="0.9em" />
    </StyledButtonContent>
  )
}

interface submitButtonProps extends ButtonProps {
  title?: string
  loading?: boolean
}

export function SubmitButton({
  title,
  loadingText,
  loading,
  disabled,
  ...props
}: submitButtonProps) {
  return (
    <Box textAlign="center" m="5rem auto 1rem">
      <LightButton
        colorScheme="blue"
        // color="white"
        type="submit"
        loadingText={loadingText}
        isLoading={loading}
        disabled={disabled}
        {...props}
      >
        {title || "Save"}
      </LightButton>
    </Box>
  )
}

interface SubmitBtnProps extends ButtonProps {
  loading: boolean
  submitBtnLabel: string
}
export function SubmitBtn({ loading, submitBtnLabel, ...props }: SubmitBtnProps) {
  return (
    <Box textAlign="center" m="5rem auto 1rem">
      <Button
        colorScheme="blue"
        type="submit"
        loadingText="submitting"
        isLoading={loading}
        {...props}
      >
        {submitBtnLabel}
      </Button>
    </Box>
  )
}
