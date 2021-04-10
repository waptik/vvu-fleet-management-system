import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createVehicleRole from "app/vehicle-roles/mutations/createVehicleRole"
import { VehicleRoleForm, FORM_ERROR } from "app/vehicle-roles/components/VehicleRoleForm"

const NewVehicleRolePage: BlitzPage = () => {
  const router = useRouter()
  const [createVehicleRoleMutation] = useMutation(createVehicleRole)

  return (
    <div>
      <h1>Create New VehicleRole</h1>

      <VehicleRoleForm
        submitText="Create VehicleRole"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateVehicleRole}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const vehicleRole = await createVehicleRoleMutation(values)
            router.push(`/vehicleRoles/${vehicleRole.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/vehicleRoles">
          <a>VehicleRoles</a>
        </Link>
      </p>
    </div>
  )
}

NewVehicleRolePage.authenticate = true
NewVehicleRolePage.getLayout = (page) => <Layout title={"Create New VehicleRole"}>{page}</Layout>

export default NewVehicleRolePage
