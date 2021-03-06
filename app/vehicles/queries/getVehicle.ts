import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetVehicle = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetVehicle), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vehicle = await db.vehicle.findFirst({ where: { id } })

  if (!vehicle) throw new NotFoundError()

  return vehicle
})
