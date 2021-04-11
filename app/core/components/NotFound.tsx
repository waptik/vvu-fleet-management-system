/* eslint-disable jsx-a11y/accessible-emoji */
import { Box, Flex, HStack } from "@chakra-ui/react"
// import { NextSeo } from "next-seo";
import { useRouter } from "next/router"
import React from "react"

import { LightButton } from "./Buttons"
import { H1 } from "./Text"

const NotFound = () => {
  const router = useRouter()

  return (
    <Flex direction="column" align="center" p={[16, 32]}>
      <Box as="span">😞</Box>
      <H1 textAlign="center" mb={8}>
        Oops, this page is not currently available
      </H1>
      <HStack spacing={4} mb={8}>
        <LightButton
          colorScheme="blue"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            router.push("/")
          }}
        >
          Go Home
        </LightButton>
      </HStack>
      {/* <NextSeo title="Page Not Found!" /> */}
    </Flex>
  )
}

export default NotFound
