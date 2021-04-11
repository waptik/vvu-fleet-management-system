import { ReactNode } from "react"
import { Box, BoxProps, Divider, Flex, FlexProps, FormLabel, Heading } from "@chakra-ui/react"

import NotFound from "./NotFound"

export function EmptyBox(props: BoxProps) {
  return <Box my={6} w="full" float="left" pos="relative" minH="1px" px="15px" {...props} />
}

export interface StyledHeadingProps extends FlexProps {
  title: string
  tips?: ReactNode
}

export function StyledHeading({ title, tips, children, ...props }: StyledHeadingProps) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading fontWeight="bold" fontSize="20px" mb={8} {...props}>
        {title}
      </Heading>
      {tips && tips}
      {children}
    </Flex>
  )
}

export function LoadingState() {
  return (
    <>
      <Box py={[16, 32]}>
        <NotFound />
      </Box>
    </>
  )
}

export function NotFoundState() {
  return (
    <>
      <Box py={[16, 32]}>
        <NotFound />
      </Box>
    </>
  )
}

export function FormList(props: FlexProps) {
  return <Flex flexDirection="column" mb={6} {...props} />
}

export function HintBox(props: BoxProps) {
  return <Box mb={4} color="gray.400" {...props} />
}

export function Hr() {
  return <Divider borderColor="gray.300" h="1px" m="2rem 0px" />
}

export function BorderTop(props: BoxProps) {
  return <Box borderTop="2px solid #CBD5E0" {...props} />
}

export function Bubble({ children }: BoxProps) {
  return (
    <Box
      className="comment-bubble"
      left="10px"
      boxShadow="card"
      border="1px solid"
      rounded="md"
      color="gray.700"
      mt={4}
      position="relative"
      overflowWrap="break-word"
      borderColor="gray.300"
      p={4}
      _before={{
        bottom: "auto",
        left: 6,
        display: "block",
        content: `""`,
        position: "absolute",
        top: "-10px",
        borderStyle: "none",
        borderColor: "gray.300",
        borderY: 0,
        borderX: 2,
      }}
    >
      <Box>
        <Box
          position="absolute"
          top="-6px"
          w={3}
          h={3}
          transform="rotate(45deg)"
          zIndex="0"
          bg="white"
          boxShadow="rgb(203 213 224) -1px -1px 1px 0px"
        />
        {children}
      </Box>
    </Box>
  )
}

export function Horizontal({ children }) {
  return (
    <Box d={{ md: "flex" }} alignItems={{ md: "center" }}>
      {children}
    </Box>
  )
}

export function Responsive({ className, ...props }: BoxProps) {
  return (
    <Box
      className={`${className} clear`}
      mt={4}
      px={{ base: 4, md: 10, lg: 4 }}
      mx="auto"
      maxW={1024}
      _before={{
        display: `table`,
        content: `""`,
      }}
      _after={{
        // "clear": `both`,
        display: `table`,
        content: `""`,
      }}
      {...props}
    />
  )
}
