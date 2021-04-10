import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetVendor = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetVendor), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vendor = await db.vendor.findFirst({ where: { id } })

  if (!vendor) throw new NotFoundError()

  return vendor
})
