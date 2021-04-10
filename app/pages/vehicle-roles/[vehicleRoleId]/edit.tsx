import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicleRole from "app/vehicle-roles/queries/getVehicleRole"
import updateVehicleRole from "app/vehicle-roles/mutations/updateVehicleRole"
import { VehicleRoleForm, FORM_ERROR } from "app/vehicle-roles/components/VehicleRoleForm"

export const EditVehicleRole = () => {
  const router = useRouter()
  const vehicleRoleId = useParam("vehicleRoleId", "number")
  const [vehicleRole, { setQueryData }] = useQuery(getVehicleRole, { id: vehicleRoleId })
  const [updateVehicleRoleMutation] = useMutation(updateVehicleRole)

  return (
    <>
      <Head>
        <title>Edit VehicleRole {vehicleRole.id}</title>
      </Head>

      <div>
        <h1>Edit VehicleRole {vehicleRole.id}</h1>
        <pre>{JSON.stringify(vehicleRole)}</pre>

        <VehicleRoleForm
          submitText="Update VehicleRole"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateVehicleRole}
          initialValues={vehicleRole}
          onSubmit={async (values) => {
            try {
              const updated = await updateVehicleRoleMutation({
                id: vehicleRole.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/vehicleRoles/${updated.id}`)
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

const EditVehicleRolePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditVehicleRole />
      </Suspense>

      <p>
        <Link href="/vehicleRoles">
          <a>VehicleRoles</a>
        </Link>
      </p>
    </div>
  )
}

EditVehicleRolePage.authenticate = true
EditVehicleRolePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditVehicleRolePage
