import { z } from 'zod'

export const Todo = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
})

export type Todo = z.infer<typeof Todo>

export const User = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string()
})

export type User = z.infer<typeof User>