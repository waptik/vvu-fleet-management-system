import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateTask = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateTask), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const task = await db.task.create({ data: input })

  return task
})
