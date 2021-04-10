import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVendor from "app/vendors/queries/getVendor"
import updateVendor from "app/vendors/mutations/updateVendor"
import { VendorForm, FORM_ERROR } from "app/vendors/components/VendorForm"

export const EditVendor = () => {
  const router = useRouter()
  const vendorId = useParam("vendorId", "number")
  const [vendor, { setQueryData }] = useQuery(getVendor, { id: vendorId })
  const [updateVendorMutation] = useMutation(updateVendor)

  return (
    <>
      <Head>
        <title>Edit Vendor {vendor.id}</title>
      </Head>

      <div>
        <h1>Edit Vendor {vendor.id}</h1>
        <pre>{JSON.stringify(vendor)}</pre>

        <VendorForm
          submitText="Update Vendor"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateVendor}
          initialValues={vendor}
          onSubmit={async (values) => {
            try {
              const updated = await updateVendorMutation({
                id: vendor.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/vendors/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditVendorPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditVendor />
      </Suspense>

      <p>
        <Link href="/vendors">
          <a>Vendors</a>
        </Link>
      </p>
    </div>
  )
}

EditVendorPage.authenticate = true
EditVendorPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditVendorPage
