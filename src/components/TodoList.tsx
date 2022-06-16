import { Table, TableContainer, Tbody, Th, Thead, Tr, Td, Text } from '@chakra-ui/react'
import React from 'react'
import useSWR from 'swr'

// interface TodoListProps {
//     todoList: readonly string[]
// }

const fetcher = (args: string) => fetch(args).then(res => res.json())

export const TodoList = () => {
    const { data, error } = useSWR('http://localhost:4000/sentences', fetcher)
    if (error) {
        return <Text fontSize='sm' color="red">{error}</Text>
    }
    if (!data && !error) {
        return <Text>Loading...</Text>
    }

    console.log(data)

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.sentences.map(todo => (
                        <Tr key={todo}>
                            <Td>{todo}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}