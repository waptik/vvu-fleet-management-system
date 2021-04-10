import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetVehicleType = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetVehicleType), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vehicleType = await db.vehicleType.findFirst({ where: { id } })

  if (!vehicleType) throw new NotFoundError()

  return vehicleType
})
