import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteVehicleRole = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteVehicleRole),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vehicleRole = await db.vehicleRole.deleteMany({ where: { id } })

    return vehicleRole
  }
)
