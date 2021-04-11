import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  Spinner,
} from "@chakra-ui/react"

interface MessageBoxProps extends AlertProps {
  /** Type of the message */
  type?: "info" | "success" | "warning" | "error"
  /** Weither icon should be hidden. Icons are only set for info, success, warning and error messages. */
  withIcon?: boolean
  /** If true, a `Spinner` will be displayed instead of the normal icon */
  isLoading?: boolean
  title?: string
}

/**
 * Display messages in a box contextualized for message type (error, success...etc)
 */
const MessageBox = ({
  withIcon,
  title,
  isLoading,
  children,
  type = "info",
  ...props
}: MessageBoxProps) => {
  if (title) {
    return (
      <Alert
        status={type}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        // justifyContent="center"
        textAlign="center"
        height="200px"
        rounded="lg"
      >
        {withIcon && <AlertIcon boxSize="40px" mr={0} />}
        <AlertTitle mt={4} mb={2} fontSize="md">
          {title}
        </AlertTitle>
        <AlertDescription fontSize="lg">{children}</AlertDescription>
      </Alert>
    )
  }

  const rest = { ...props }
  delete rest.width

  return (
    <>
      <Alert rounded="lg" status={type} width="unset" variant="subtle" {...rest}>
        {isLoading && (
          <Box as="span" mr={2} display="inline-block">
            <Spinner boxSize="1.5em" />
          </Box>
        )}
        {withIcon && !isLoading && <AlertIcon />}
        <AlertDescription display="block">{children}</AlertDescription>
      </Alert>
    </>
  )
}

export default MessageBox
