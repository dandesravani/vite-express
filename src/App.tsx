import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import useSWR from 'swr'
import { AddSentenceForm } from './components/AddSentenceForm'
import { PageSize } from './components/PageSize'
import { Paginator } from './components/Paginator'
import { SentencesView } from './components/SentencesView'

const fetcher = (args: string) => fetch(args).then(res => res.json())

function App() {
  const [page, setPage] = React.useState(1)
  const [size, setSize] = React.useState(5)
  const [sentence, setSentence] = React.useState('')
  const [values, setValues] = React.useState([])

  const { data, error } = useSWR(
    `http://localhost:4000/sentences?page=${page}&size=${size}`,
    fetcher,
  )
  if (error) {
    return (
      <Text fontSize="sm" color="red">
        {error}
      </Text>
    )
  }
  if (!data) {
    return <Text>Loading...</Text>
  }

  React.useEffect(() => {
    fetch(`http://localhost:4000/sentences?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(data => setValues(data.sentencesPerPage))
      .catch(err => console.log(err))
  }, [])

  const handleAddClick = (val: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentence: val }),
    }
    fetch('http://localhost:4000/sentences', requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data, 'data')
        setValues(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="center" mt="20px">
        <Box w="600px">
          <InputGroup>
            <Input
              type="tel"
              placeholder="Add sentence"
              value={sentence}
              onChange={evt => setSentence(evt.target.value)}
            />
            <InputRightAddon
              children="Add"
              onClick={() => {
                handleAddClick(sentence)
                setSentence('')
              }}
            />
          </InputGroup>
        </Box>
      </Flex>
      <SentencesView
        sentences={values.length == 0 ? data.sentencesPerPage : values}
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
