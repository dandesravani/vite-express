import { Flex, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { z } from 'zod'
import { AddTodoForm } from './components/AddTodoForm'
import { PageSize } from './components/PageSize'
import { Paginator } from './components/Paginator'
import { TodoList } from './components/TodoList'
import { Todo } from './components/data'
import axios from 'redaxios'
import { EditTodoForm } from './components/EditTodoForm'

const fetchTodos = async ({ queryKey }: any) => {
  const res = await fetch(
    `/api/${queryKey[0]}?page=${queryKey[1]}&size=${queryKey[2]}`,
  )
  return res.json()
}

const postTodo = async (todo: Todo) => {
  const result = await axios.post('/api/todos', todo)
  return result.data
}

const editTodo = async (todo: Todo) => {
  const result = await axios.put(`/api/todos/${todo.id}`, todo)
  console.log(result.data, 'from server')
  return result.data
}

const deleteTodo = async (id: string) => {
  const result = await axios.delete(`/api/todos/${id}`)
  return result.data
}

function App() {
  const [page, setPage] = React.useState(1)
  const [size, setSize] = React.useState(5)
  const [show, setShow] = React.useState(false)
  const [todo, setTodo] = React.useState({ title: '', done: false })
  const [isEdit, setEdit] = React.useState(false)

  const { data, status } = useQuery(['todos', page, size], fetchTodos)
  const queryClient = useQueryClient()

  const { mutate } = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const { mutate: editMutate } = useMutation(editTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const { mutate: deleteMutate } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  if (status === 'error') {
    return <p>Error fetching data</p>
  }
  if (status === 'loading') {
    return <p>loading data...</p>
  }

  z.array(Todo).parse(data.paginationTodos)

  return (
    <>
      {isEdit ? (
        <EditTodoForm
          todo={todo}
          onEditTodo={editMutate}
          isEdit={isEdit}
          onIsEdit={isEdit => setEdit(!isEdit)}
        />
      ) : (
        <AddTodoForm
          onAddTodo={mutate}
          show={show}
          onShow={show => setShow(!show)}
        />
      )}

      <TodoList
        todoList={data.paginationTodos}
        onTodoDelete={deleteMutate}
        onEditTodo={setTodo}
        isEdit={isEdit}
        onEditChange={isEdit => setEdit(!isEdit)}
      />
      <Flex flexDir="column" alignItems="center" mt="10px">
        <HStack>
          <Heading as="h6" size="md">
            Page:{page}
          </Heading>
          <PageSize initialSize={size} onSizeClick={setSize} />
        </HStack>
        <Paginator
          maxPageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </Flex>
    </>
  )
}

export default App
