import { Flex, Box, InputGroup, Input, InputRightAddon } from '@chakra-ui/react'
import React from 'react'

interface AddSentenceFormProps {
    onAddSentence(sentence: string): void
}

export const AddSentenceForm: React.FC<AddSentenceFormProps> = ({ onAddSentence }) => {
    const [text, set] = React.useState('')
    return (
        <Flex alignItems="center" justifyContent="center" mt="20px">
            <Box w="600px">
                <InputGroup>
                    <Input
                        type="tel"
                        placeholder="Add sentence"
                        value={text}
                        onChange={evt => set(evt.target.value)}
                    />
                    <InputRightAddon
                        as="button"
                        children="Add"
                        onClick={() => {
                            onAddSentence(text)
                            set('')
                        }}
                    />
                </InputGroup>
            </Box>
        </Flex>
    )
}