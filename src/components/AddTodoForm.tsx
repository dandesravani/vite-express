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

interface AddTodoFormProps {
  readonly show: boolean
  onShow(show: boolean): void
  onAddTodo(todo: Omit<Todo, 'id'>): void
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  show,
  onAddTodo,
  onShow,
}) => {
  const [todo, setTodo] = React.useState({ title: '', done: false })
  return (
    <>
      {show ? (
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
                onAddTodo(todo)
                onShow(show)
                setTodo({ title: '', done: false })
              }}
            >
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  value={todo.title}
                  onChange={evt =>
                    setTodo({ ...todo, title: evt.target.value })
                  }
                />
              </FormControl>
              <FormControl mt="5px">
                <Checkbox
                  size="md"
                  colorScheme="green"
                  checked={todo.done}
                  onChange={evt =>
                    setTodo({ ...todo, done: evt.target.checked })
                  }
                >
                  Done
                </Checkbox>
              </FormControl>
              <Button colorScheme="blue" type="submit" mt="10px">
                Submit
              </Button>
            </form>
          </Box>
        </Flex>
      ) : (
        <Flex justify="center" mt="20px">
          <Button
            colorScheme="teal"
            onClick={() => {
              onShow(show)
            }}
          >
            Add Todo
          </Button>
        </Flex>
      )}
    </>
  )
}
