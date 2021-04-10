import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicleRole from "app/vehicle-roles/queries/getVehicleRole"
import deleteVehicleRole from "app/vehicle-roles/mutations/deleteVehicleRole"

export const VehicleRole = () => {
  const router = useRouter()
  const vehicleRoleId = useParam("vehicleRoleId", "number")
  const [deleteVehicleRoleMutation] = useMutation(deleteVehicleRole)
  const [vehicleRole] = useQuery(getVehicleRole, { id: vehicleRoleId })

  return (
    <>
      <Head>
        <title>VehicleRole {vehicleRole.id}</title>
      </Head>

      <div>
        <h1>VehicleRole {vehicleRole.id}</h1>
        <pre>{JSON.stringify(vehicleRole, null, 2)}</pre>

        <Link href={`/vehicleRoles/${vehicleRole.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteVehicleRoleMutation({ id: vehicleRole.id })
              router.push("/vehicleRoles")
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

const ShowVehicleRolePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/vehicleRoles">
          <a>VehicleRoles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <VehicleRole />
      </Suspense>
    </div>
  )
}

ShowVehicleRolePage.authenticate = true
ShowVehicleRolePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowVehicleRolePage
