import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'

interface SentencesViewProps {
  sentences: readonly string[]
}

export const SentencesView: React.FC<SentencesViewProps> = ({ sentences }) => {
  console.log(sentences)
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
            {sentences.map((sentence, idx) => (
              <Tr key={idx}>
                <Td>{sentence.sentence}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
