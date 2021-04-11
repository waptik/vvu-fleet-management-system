import { BoxProps, chakra, Heading, HeadingProps, Text, TextProps } from "@chakra-ui/react"

export function P({ children, ...props }: TextProps) {
  return <Text {...props}>{children}</Text>
}

P.defaultProps = {
  letterSpacing: "-0.4px",
  lineHeight: "1.1em",
}

export function Span({ children, ...props }: BoxProps) {
  return <P {...props}>{children}</P>
}

Span.defaultProps = {
  ...P.defaultProps,
  as: "span",
  fontSize: "inherit",
  lineHeight: "inherit",
}
export function H1({ children, ...props }: HeadingProps) {
  return <Heading {...props}>{children}</Heading>
}

H1.defaultProps = {
  ...P.defaultProps,
  as: "h1",
  fontSize: "4xl",
  fontWeight: "bold",
  letterSpacing: "-1.2px",
  lineHeight: "56px",
  textAlign: "left",
}

export function H2({ children, ...props }: HeadingProps) {
  return <Heading {...props}>{children}</Heading>
}

H2.defaultProps = {
  ...P.defaultProps,
  as: "h2",
  fontSize: "3xl",
  fontWeight: "bold",
  letterSpacing: "-0.4px",
  lineHeight: "44px",
}

export function H3({ children, ...props }: HeadingProps) {
  return <Heading {...props}>{children}</Heading>
}

H3.defaultProps = {
  ...P.defaultProps,
  as: "h3",
  fontSize: "2xl",
  fontWeight: "bold",
  letterSpacing: "-0.4px",
  lineHeight: "36px",
}

export function H4({ children, ...props }: HeadingProps) {
  return <Heading {...props}>{children}</Heading>
}

H4.defaultProps = {
  ...P.defaultProps,
  as: "h4",
  fontSize: "xl",
  fontWeight: "bold",
  letterSpacing: "-0.4px",
  lineHeight: "32px",
}

export function H5({ children, ...props }: HeadingProps) {
  return <Heading {...props}>{children}</Heading>
}

H5.defaultProps = {
  ...P.defaultProps,
  as: "h5",
  fontSize: "lg",
  letterSpacing: "-0.4px",
  lineHeight: "24px",
  fontWeight: 500,
  color: "black.900",
}

export function H6({ children, ...props }: HeadingProps) {
  return (
    <Heading as="h6" size="xs" {...props}>
      {children}
    </Heading>
  )
}
