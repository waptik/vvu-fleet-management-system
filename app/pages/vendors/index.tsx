import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVendors from "app/vendors/queries/getVendors"

const ITEMS_PER_PAGE = 100

export const VendorsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ vendors, hasMore }] = usePaginatedQuery(getVendors, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id}>
            <Link href={`/vendors/${vendor.id}`}>
              <a>{vendor.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const VendorsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Vendors</title>
      </Head>

      <div>
        <p>
          <Link href="/vendors/new">
            <a>Create Vendor</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <VendorsList />
        </Suspense>
      </div>
    </>
  )
}

VendorsPage.authenticate = true
VendorsPage.getLayout = (page) => <Layout>{page}</Layout>

export default VendorsPage
