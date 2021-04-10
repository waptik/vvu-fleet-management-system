import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicleType from "app/vehicle-types/queries/getVehicleType"
import updateVehicleType from "app/vehicle-types/mutations/updateVehicleType"
import { VehicleTypeForm, FORM_ERROR } from "app/vehicle-types/components/VehicleTypeForm"

export const EditVehicleType = () => {
  const router = useRouter()
  const vehicleTypeId = useParam("vehicleTypeId", "number")
  const [vehicleType, { setQueryData }] = useQuery(getVehicleType, { id: vehicleTypeId })
  const [updateVehicleTypeMutation] = useMutation(updateVehicleType)

  return (
    <>
      <Head>
        <title>Edit VehicleType {vehicleType.id}</title>
      </Head>

      <div>
        <h1>Edit VehicleType {vehicleType.id}</h1>
        <pre>{JSON.stringify(vehicleType)}</pre>

        <VehicleTypeForm
          submitText="Update VehicleType"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateVehicleType}
          initialValues={vehicleType}
          onSubmit={async (values) => {
            try {
              const updated = await updateVehicleTypeMutation({
                id: vehicleType.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/vehicleTypes/${updated.id}`)
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

const EditVehicleTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditVehicleType />
      </Suspense>

      <p>
        <Link href="/vehicleTypes">
          <a>VehicleTypes</a>
        </Link>
      </p>
    </div>
  )
}

EditVehicleTypePage.authenticate = true
EditVehicleTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditVehicleTypePage
