import {
  Flex,
  Heading,
  HStack
} from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AddSentenceForm } from './components/AddSentenceForm'
import { PageSize } from './components/PageSize'
import { Paginator } from './components/Paginator'
import { SentencesView } from './components/SentencesView'


const fetchSentences = async ({ queryKey }: any) => {
  console.log(queryKey)
  const res = await fetch(`/api/${queryKey[0]}?page=${queryKey[1]}&size=${queryKey[2]}`);
  return res.json();
};

const postSentence = (val: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sentence: val }),
  }

  return fetch('/api/sentences', requestOptions)
    .then(res => res.json())
    .catch(err => console.log(err))
}

function App() {
  const [page, setPage] = React.useState(1)
  const [size, setSize] = React.useState(5)
  const [values, setValues] = React.useState([])

  const { data, status } = useQuery(['sentences', page, size], fetchSentences)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(postSentence, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sentences'])
    }
  })

  if (status === "error") { return <p>Error fetching data</p> }
  if (status === "loading") { return <p>loading data...</p> }


  console.log(data)
  return (
    <>
      <AddSentenceForm onAddSentence={mutate} />
      <SentencesView
        // sentences={values.length == 0 ? data.sentencesPerPage : values}
        sentences={data.sentencesPerPage}
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
