import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateVendor = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateVendor), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vendor = await db.vendor.create({ data: input })

  return vendor
})
