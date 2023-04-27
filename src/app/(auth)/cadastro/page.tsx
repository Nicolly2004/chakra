'use client'
import { Flex, Heading, Button, Text } from '@chakra-ui/react'
import {Input} from '@/components/Input'
import {Link} from '@chakra-ui/next-js'


export default function Cadastro() {
    return (
        <Flex 
        as="main" 
        bg="white"
        minW="40vw"
        padding={8} 
        borderRadius="10px" 
        direction="column"
        boxShadow="0 8px 32px rgba(0,0,0,0.2)"
        >

            <Heading fontSize="2rem">Cadastre-se</Heading>
            <Flex
            as="form"
            direction="column" 
            gap={5} 
            mt={2}
            pt={2}
            borderTop="1px solid rgba(0,0,0,.1)"
               >

              <Input label="Nome" id="nome" type="text" placeholder="Nick Reis" />
              <Input
              label="email"
              id="email"
              type="email"
              placeholder="Nicolly@email.com"/>

          <Input label="Senha" id="senha" type="password"  />
          <Input label="Confirme sua Senha" id="sonfirme-senha" type="password" />
          <Button colorScheme="green">Cadastrar</Button>
               </Flex>
               <Text>
                Já possui conta? {' '}
            <Link href="/login" fontWeight={600} color="blue.200">
                Acesse sua conta
            </Link>
               </Text>
        </Flex>
    )
}