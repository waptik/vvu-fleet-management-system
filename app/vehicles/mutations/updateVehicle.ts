import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateVehicle = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateVehicle),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vehicle = await db.vehicle.update({ where: { id }, data })

    return vehicle
  }
)
