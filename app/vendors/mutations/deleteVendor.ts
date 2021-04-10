import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteVendor = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteVendor), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vendor = await db.vendor.deleteMany({ where: { id } })

  return vendor
})
