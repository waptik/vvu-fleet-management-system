import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicleType from "app/vehicle-types/queries/getVehicleType"
import deleteVehicleType from "app/vehicle-types/mutations/deleteVehicleType"

export const VehicleType = () => {
  const router = useRouter()
  const vehicleTypeId = useParam("vehicleTypeId", "number")
  const [deleteVehicleTypeMutation] = useMutation(deleteVehicleType)
  const [vehicleType] = useQuery(getVehicleType, { id: vehicleTypeId })

  return (
    <>
      <Head>
        <title>VehicleType {vehicleType.id}</title>
      </Head>

      <div>
        <h1>VehicleType {vehicleType.id}</h1>
        <pre>{JSON.stringify(vehicleType, null, 2)}</pre>

        <Link href={`/vehicleTypes/${vehicleType.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteVehicleTypeMutation({ id: vehicleType.id })
              router.push("/vehicleTypes")
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

const ShowVehicleTypePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/vehicleTypes">
          <a>VehicleTypes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <VehicleType />
      </Suspense>
    </div>
  )
}

ShowVehicleTypePage.authenticate = true
ShowVehicleTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowVehicleTypePage
