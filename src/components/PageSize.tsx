import React from 'react'
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react'

interface PageSizeProps {
  readonly initialSize: number
  onSizeClick(size: any): void
}

export const PageSize: React.FC<PageSizeProps> = ({
  onSizeClick,
  initialSize,
}) => {
  const [num, setNum] = React.useState(initialSize)

  return (
    <>
      <InputGroup w="150px">
        <Input
          placeholder="Sentences per page"
          value={num}
          onChange={evt => setNum(+evt.target.value)}
        />
        <InputRightAddon children="size" onClick={() => onSizeClick(num)} />
      </InputGroup>
    </>
  )
}
