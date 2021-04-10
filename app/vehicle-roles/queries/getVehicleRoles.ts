import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetVehicleRolesInput
  extends Pick<Prisma.VehicleRoleFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetVehicleRolesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: vehicleRoles, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.vehicleRole.count({ where }),
      query: (paginateArgs) => db.vehicleRole.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      vehicleRoles,
      nextPage,
      hasMore,
      count,
    }
  }
)
