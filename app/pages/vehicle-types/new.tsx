import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createVehicleType from "app/vehicle-types/mutations/createVehicleType"
import { VehicleTypeForm, FORM_ERROR } from "app/vehicle-types/components/VehicleTypeForm"

const NewVehicleTypePage: BlitzPage = () => {
  const router = useRouter()
  const [createVehicleTypeMutation] = useMutation(createVehicleType)

  return (
    <div>
      <h1>Create New VehicleType</h1>

      <VehicleTypeForm
        submitText="Create VehicleType"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateVehicleType}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const vehicleType = await createVehicleTypeMutation(values)
            router.push(`/vehicleTypes/${vehicleType.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/vehicleTypes">
          <a>VehicleTypes</a>
        </Link>
      </p>
    </div>
  )
}

NewVehicleTypePage.authenticate = true
NewVehicleTypePage.getLayout = (page) => <Layout title={"Create New VehicleType"}>{page}</Layout>

export default NewVehicleTypePage
