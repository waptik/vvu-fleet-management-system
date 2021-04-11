import { ComponentProps, forwardRef, Ref } from "react"
import { Flex, FlexProps, Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"
import { Link } from "blitz"
import { useRouter } from "next/router"

export type LinkProps = {
  href?: string | undefined
  disabled?: boolean | any
  passHref?: boolean
  linkProps?: Omit<ComponentProps<typeof Link>, "href" | "as" | "passHref">
} & ChakraLinkProps

export const StyledLink = forwardRef(function (
  { href, children, disabled, linkProps = {}, ...props }: LinkProps,
  ref: Ref<any>
) {
  const router = useRouter()

  const isActive = href ? router?.asPath.startsWith(href) : router.asPath === href

  return (
    <Link {...linkProps} href={href ?? ""} passHref>
      {disabled ? (
        <ChakraLink
          aria-label={isActive ? "page" : undefined}
          _hover={{}}
          color={undefined}
          ref={ref || null}
          _disabled={{
            pointerEvents: "none",
            cursor: "default",
            textDecoration: "none",
            color: "blackAlpha.300",
          }}
          {...props}
        >
          {children}
        </ChakraLink>
      ) : (
        <ChakraLink
          color={undefined}
          ref={ref || null}
          aria-label={isActive ? "page" : undefined}
          _hover={{}}
          {...props}
        >
          {children}
        </ChakraLink>
      )}
    </Link>
  )
})

export type SimpleLinkProps = Omit<
  ComponentProps<typeof StyledLink>,
  "href" | "as" | "passHref" | "animate"
>

export const SimpleLink = ({ children, disabled, ...props }: SimpleLinkProps) => {
  return (
    <>
      {disabled ? (
        <ChakraLink
          aria-label={undefined}
          _hover={{}}
          color={null}
          _disabled={{
            pointerEvents: "none",
            cursor: "default",
            textDecoration: "none",
            color: "blackAlpha.300",
          }}
          {...props}
        >
          {children}
        </ChakraLink>
      ) : (
        <ChakraLink aria-label={undefined} _hover={{}} {...props}>
          {children}
        </ChakraLink>
      )}
    </>
  )
}

type ActiveLinkProps = { href: string; clx?: ComponentProps<typeof Object> } & FlexProps

export function ActiveLink({ href, children, clx, ...props }: ActiveLinkProps) {
  const router = useRouter()
  const isActiveLink = router.pathname === href || router.asPath === href
  const clxs = isActiveLink
    ? clx ?? {
        color: "blue.500",
        borderBottomWidth: 2,
        borderBottomColor: "blue.500",
      }
    : {}

  return (
    <Flex as={StyledLink} href={href} {...props} {...clxs}>
      {children}
    </Flex>
  )
}
