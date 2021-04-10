import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateVehicleType = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateVehicleType),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vehicleType = await db.vehicleType.update({ where: { id }, data })

    return vehicleType
  }
)
