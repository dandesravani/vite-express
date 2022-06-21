import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'
import { Todo } from './data'

interface EditFormProps {
  readonly todo: Todo
  readonly isEdit: boolean
  onIsEdit(isEdit: boolean): void
  onEditTodo(todo: Todo): void
}

export const EditTodoForm: React.FC<EditFormProps> = ({
  todo,
  isEdit,
  onEditTodo,
  onIsEdit,
}) => {
  const [editedTodo, setEditedTodo] = React.useState({
    id: todo.id,
    title: todo.title,
    done: todo.done,
  })
  return (
    <Flex alignItems="center" justifyContent="center" mt="20px">
      <Box
        w="600px"
        boxShadow="  inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);"
        p="30px"
      >
        <form
          onSubmit={evt => {
            evt.preventDefault()
            onEditTodo(editedTodo)
            onIsEdit(isEdit)
            setEditedTodo({ id: todo.id, title: '', done: false })
          }}
        >
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              value={editedTodo.title}
              onChange={evt =>
                setEditedTodo({ ...editedTodo, title: evt.target.value })
              }
            />
          </FormControl>
          <FormControl mt="5px">
            <Checkbox
              size="md"
              colorScheme="green"
              isChecked={editedTodo.done}
              onChange={evt =>
                setEditedTodo({ ...editedTodo, done: evt.target.checked })
              }
            >
              Done
            </Checkbox>
          </FormControl>
          <Button colorScheme="blue" type="submit" mt="10px">
            Edit
          </Button>
        </form>
      </Box>
    </Flex>
  )
}
