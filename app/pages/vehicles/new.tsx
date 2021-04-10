import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createVehicle from "app/vehicles/mutations/createVehicle"
import { VehicleForm, FORM_ERROR } from "app/vehicles/components/VehicleForm"

const NewVehiclePage: BlitzPage = () => {
  const router = useRouter()
  const [createVehicleMutation] = useMutation(createVehicle)

  return (
    <div>
      <h1>Create New Vehicle</h1>

      <VehicleForm
        submitText="Create Vehicle"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateVehicle}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const vehicle = await createVehicleMutation(values)
            router.push(`/vehicles/${vehicle.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/vehicles">
          <a>Vehicles</a>
        </Link>
      </p>
    </div>
  )
}

NewVehiclePage.authenticate = true
NewVehiclePage.getLayout = (page) => <Layout title={"Create New Vehicle"}>{page}</Layout>

export default NewVehiclePage
