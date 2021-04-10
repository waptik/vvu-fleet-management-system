import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicle from "app/vehicles/queries/getVehicle"
import deleteVehicle from "app/vehicles/mutations/deleteVehicle"

export const Vehicle = () => {
  const router = useRouter()
  const vehicleId = useParam("vehicleId", "number")
  const [deleteVehicleMutation] = useMutation(deleteVehicle)
  const [vehicle] = useQuery(getVehicle, { id: vehicleId })

  return (
    <>
      <Head>
        <title>Vehicle {vehicle.id}</title>
      </Head>

      <div>
        <h1>Vehicle {vehicle.id}</h1>
        <pre>{JSON.stringify(vehicle, null, 2)}</pre>

        <Link href={`/vehicles/${vehicle.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteVehicleMutation({ id: vehicle.id })
              router.push("/vehicles")
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

const ShowVehiclePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/vehicles">
          <a>Vehicles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Vehicle />
      </Suspense>
    </div>
  )
}

ShowVehiclePage.authenticate = true
ShowVehiclePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowVehiclePage
