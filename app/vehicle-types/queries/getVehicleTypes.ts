import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetVehicleTypesInput
  extends Pick<Prisma.VehicleTypeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetVehicleTypesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: vehicleTypes, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.vehicleType.count({ where }),
      query: (paginateArgs) => db.vehicleType.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      vehicleTypes,
      nextPage,
      hasMore,
      count,
    }
  }
)
