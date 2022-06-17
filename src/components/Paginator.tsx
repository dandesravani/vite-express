import { Button, ButtonGroup, HStack } from '@chakra-ui/react'
import React from 'react'

interface PaginatorProps {
  readonly maxPageCount: number
  readonly currentPage: number
  onPageChange(page: number): void
}

export const Paginator: React.FC<PaginatorProps> = ({
  maxPageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <HStack mt="10px">
      <ButtonGroup>
        <Button
          onClick={() => {
            onPageChange(1)
          }}
        >
          First
        </Button>
        <Button
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1)
            }
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (currentPage !== maxPageCount) {
              onPageChange(currentPage + 1)
            }
          }}
        >
          Next
        </Button>
        <Button
          onClick={() => {
            onPageChange(maxPageCount)
          }}
        >
          Last
        </Button>
      </ButtonGroup>
    </HStack>
  )
}
