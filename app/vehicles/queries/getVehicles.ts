import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetVehiclesInput
  extends Pick<Prisma.VehicleFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetVehiclesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: vehicles, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.vehicle.count({ where }),
      query: (paginateArgs) => db.vehicle.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      vehicles,
      nextPage,
      hasMore,
      count,
    }
  }
)
