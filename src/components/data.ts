import { z } from 'zod'

export const Todo = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
})

export type Todo = z.infer<typeof Todo>
