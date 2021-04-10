import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Box } from "@chakra-ui/layout"
import {
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
  VisuallyHidden,
} from "@chakra-ui/react"
import Header from "app/core/components/Header"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <Box bg={mode("gray.50", "inherit")} minH="100vh" py="12" px={{ sm: "6", lg: "8" }}>
        <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} w={{ sm: "full" }}>
          <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
            Create an account
          </Heading>
        </Box>
        <SignupForm onSuccess={() => router.push("/")} />
      </Box>{" "}
    </>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
