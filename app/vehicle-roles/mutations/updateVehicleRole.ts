import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateVehicleRole = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateVehicleRole),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vehicleRole = await db.vehicleRole.update({ where: { id }, data })

    return vehicleRole
  }
)
