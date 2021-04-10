import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicle from "app/vehicles/queries/getVehicle"
import updateVehicle from "app/vehicles/mutations/updateVehicle"
import { VehicleForm, FORM_ERROR } from "app/vehicles/components/VehicleForm"

export const EditVehicle = () => {
  const router = useRouter()
  const vehicleId = useParam("vehicleId", "number")
  const [vehicle, { setQueryData }] = useQuery(getVehicle, { id: vehicleId })
  const [updateVehicleMutation] = useMutation(updateVehicle)

  return (
    <>
      <Head>
        <title>Edit Vehicle {vehicle.id}</title>
      </Head>

      <div>
        <h1>Edit Vehicle {vehicle.id}</h1>
        <pre>{JSON.stringify(vehicle)}</pre>

        <VehicleForm
          submitText="Update Vehicle"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateVehicle}
          initialValues={vehicle}
          onSubmit={async (values) => {
            try {
              const updated = await updateVehicleMutation({
                id: vehicle.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/vehicles/${updated.id}`)
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

const EditVehiclePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditVehicle />
      </Suspense>

      <p>
        <Link href="/vehicles">
          <a>Vehicles</a>
        </Link>
      </p>
    </div>
  )
}

EditVehiclePage.authenticate = true
EditVehiclePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditVehiclePage
