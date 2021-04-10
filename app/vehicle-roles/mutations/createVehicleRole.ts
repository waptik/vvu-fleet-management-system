import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateVehicleRole = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateVehicleRole),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vehicleRole = await db.vehicleRole.create({ data: input })

    return vehicleRole
  }
)
