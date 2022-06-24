import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'redaxios'
import { z } from 'zod'
import { User } from './data'
import { SignupForm } from './SignupForm'

const fetchUsers = async (queryKey: any) => {
  console.log(queryKey[0])
  const res = await fetch(`/api/${queryKey[0]}`)
  return res.json()
}

const signup = async (user: User) => {
  const result = await axios.post('/api/signup', user)
  return result.data
}

export const SignupPage = () => {
  const { data, status } = useQuery('users', fetchUsers)

  const queryClient = useQueryClient()

  const { mutate: signupMutate } = useMutation(signup, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  if (status === 'error') {
    return <p>Error fetching data</p>
  }
  if (status === 'loading') {
    return <p>loading data...</p>
  }

  console.log(data)

  z.array(User).parse(data)

  return <SignupForm onSignup={signupMutate} />
}
