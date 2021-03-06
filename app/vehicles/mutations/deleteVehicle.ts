import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteVehicle = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteVehicle), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vehicle = await db.vehicle.deleteMany({ where: { id } })

  return vehicle
})
