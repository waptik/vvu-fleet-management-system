import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getVehicleTypes from "app/vehicle-types/queries/getVehicleTypes"

const ITEMS_PER_PAGE = 100

export const VehicleTypesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ vehicleTypes, hasMore }] = usePaginatedQuery(getVehicleTypes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {vehicleTypes.map((vehicleType) => (
          <li key={vehicleType.id}>
            <Link href={`/vehicleTypes/${vehicleType.id}`}>
              <a>{vehicleType.name}</a>
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

const VehicleTypesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>VehicleTypes</title>
      </Head>

      <div>
        <p>
          <Link href="/vehicleTypes/new">
            <a>Create VehicleType</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <VehicleTypesList />
        </Suspense>
      </div>
    </>
  )
}

VehicleTypesPage.authenticate = true
VehicleTypesPage.getLayout = (page) => <Layout>{page}</Layout>

export default VehicleTypesPage
