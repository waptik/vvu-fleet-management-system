import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetVehicleRole = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetVehicleRole), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vehicleRole = await db.vehicleRole.findFirst({ where: { id } })

  if (!vehicleRole) throw new NotFoundError()

  return vehicleRole
})
