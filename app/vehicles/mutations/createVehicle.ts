import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateVehicle = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateVehicle), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vehicle = await db.vehicle.create({ data: input })

  return vehicle
})
