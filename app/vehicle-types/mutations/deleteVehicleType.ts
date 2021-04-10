import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteVehicleType = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteVehicleType),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vehicleType = await db.vehicleType.deleteMany({ where: { id } })

    return vehicleType
  }
)
