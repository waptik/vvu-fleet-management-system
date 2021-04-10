import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicles from "app/vehicles/queries/getVehicles"

const ITEMS_PER_PAGE = 100

export const VehiclesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ vehicles, hasMore }] = usePaginatedQuery(getVehicles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <Link href={`/vehicles/${vehicle.id}`}>
              <a>{vehicle.name}</a>
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

const VehiclesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Vehicles</title>
      </Head>

      <div>
        <p>
          <Link href="/vehicles/new">
            <a>Create Vehicle</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <VehiclesList />
        </Suspense>
      </div>
    </>
  )
}

VehiclesPage.authenticate = true
VehiclesPage.getLayout = (page) => <Layout>{page}</Layout>

export default VehiclesPage
