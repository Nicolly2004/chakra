import { Flex, Heading, Text, Link } from '@chakra-ui/react'
import { FC } from 'react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'



export const Footer: FC = () => {
    return (
    <Flex 
    grow={1} 
    as="footer" 
    padding={4}
     gap={2} 
     justify="space-between"
     align="center"
     borderTop="1px solid rgba(0,0,0,0.25"
     marginX={4}
     marginTop={16}
     >
        <Flex direction="column">
            <Heading fontSize="1rem">MyFood</Heading>
            <Text>&copy: MyFood 2023 - Todos os direitos Reservados.</Text>
        </Flex>
        
        <Flex direction="column">
            <Heading fontSize="1rem">Redes Sociais</Heading>
            <Flex gap={3}>
                <Link href="https://instagram.com" target="blanck">
                    <FaInstagram/>
                </Link>
                <Link href="https://www.youtube.com" target="blanck">
                    <FaYoutube/>
                </Link>
            </Flex>
        </Flex>
    </Flex>
    )
}