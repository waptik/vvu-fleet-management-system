import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVendor from "app/vendors/queries/getVendor"
import deleteVendor from "app/vendors/mutations/deleteVendor"

export const Vendor = () => {
  const router = useRouter()
  const vendorId = useParam("vendorId", "number")
  const [deleteVendorMutation] = useMutation(deleteVendor)
  const [vendor] = useQuery(getVendor, { id: vendorId })

  return (
    <>
      <Head>
        <title>Vendor {vendor.id}</title>
      </Head>

      <div>
        <h1>Vendor {vendor.id}</h1>
        <pre>{JSON.stringify(vendor, null, 2)}</pre>

        <Link href={`/vendors/${vendor.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteVendorMutation({ id: vendor.id })
              router.push("/vendors")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowVendorPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/vendors">
          <a>Vendors</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Vendor />
      </Suspense>
    </div>
  )
}

ShowVendorPage.authenticate = true
ShowVendorPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowVendorPage
