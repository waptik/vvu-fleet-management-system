import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateVehicleType = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateVehicleType),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vehicleType = await db.vehicleType.create({ data: input })

    return vehicleType
  }
)
