import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { User } from './data'

interface SignupFormProps {
  onSignup(user: User): void
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
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
            onSignup(user)
          }}
        >
          <FormControl>
            <FormLabel htmlFor="title">Username</FormLabel>
            <Input
              type="text"
              value={user.username}
              onChange={evt => setUser({ ...user, username: evt.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Email</FormLabel>
            <Input
              type="email"
              value={user.email}
              onChange={evt => setUser({ ...user, email: evt.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Password</FormLabel>
            <Input
              type="password"
              value={user.password}
              onChange={evt => setUser({ ...user, password: evt.target.value })}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" mt="10px">
            Signup
          </Button>
        </form>
      </Box>
    </Flex>
  )
}
