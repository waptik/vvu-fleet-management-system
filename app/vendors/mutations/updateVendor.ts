import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateVendor = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateVendor),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const vendor = await db.vendor.update({ where: { id }, data })

    return vendor
  }
)
