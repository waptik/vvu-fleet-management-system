import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicleRoles from "app/vehicle-roles/queries/getVehicleRoles"

const ITEMS_PER_PAGE = 100

export const VehicleRolesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ vehicleRoles, hasMore }] = usePaginatedQuery(getVehicleRoles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {vehicleRoles.map((vehicleRole) => (
          <li key={vehicleRole.id}>
            <Link href={`/vehicleRoles/${vehicleRole.id}`}>
              <a>{vehicleRole.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const VehicleRolesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>VehicleRoles</title>
      </Head>

      <div>
        <p>
          <Link href="/vehicleRoles/new">
            <a>Create VehicleRole</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <VehicleRolesList />
        </Suspense>
      </div>
    </>
  )
}

VehicleRolesPage.authenticate = true
VehicleRolesPage.getLayout = (page) => <Layout>{page}</Layout>

export default VehicleRolesPage
