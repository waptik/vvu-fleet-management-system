import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createVendor from "app/vendors/mutations/createVendor"
import { VendorForm, FORM_ERROR } from "app/vendors/components/VendorForm"

const NewVendorPage: BlitzPage = () => {
  const router = useRouter()
  const [createVendorMutation] = useMutation(createVendor)

  return (
    <div>
      <h1>Create New Vendor</h1>

      <VendorForm
        submitText="Create Vendor"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateVendor}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const vendor = await createVendorMutation(values)
            router.push(`/vendors/${vendor.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/vendors">
          <a>Vendors</a>
        </Link>
      </p>
    </div>
  )
}

NewVendorPage.authenticate = true
NewVendorPage.getLayout = (page) => <Layout title={"Create New Vendor"}>{page}</Layout>

export default NewVendorPage
