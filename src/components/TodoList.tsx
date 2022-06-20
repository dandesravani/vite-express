import {
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
import { Todo } from './data'

interface TodoListProps {
  todoList: Todo[]
  isEdit: boolean
  onEditChange(edit: boolean): void
  onTodoDelete(id: string): void
  onEditTodo(todo: Omit<Todo, 'id'>): void
}

export const TodoList: React.FC<TodoListProps> = ({
  todoList,
  isEdit,
  onEditChange,
  onTodoDelete,
  onEditTodo,
}) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todoList.map(todo => (
              <Tr key={todo.id}>
                <Td>{todo.title}</Td>
                <Td>{todo.done}</Td>
                <Td>
                  <ButtonGroup>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        console.log(todo)
                        onEditChange(isEdit)
                        onEditTodo(todo)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => onTodoDelete(todo.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
