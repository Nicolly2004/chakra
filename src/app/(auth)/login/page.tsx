'use client';

import { Input } from '@/components/Input'
import { Flex, Heading, Button,Text, useDisclosure, IconButton} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@/contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const validacaoLogin = yup.object().shape({
    email: yup
    .string()
    .email('Você precisa informar um e-mail válido')
    .required('Você precisa informar um e-mail'),
    password: yup
    .string()
    .required('Informe sua senha')
    .min(8,'Sua senha precisa ter no mínino 8 caracteres'),
})

type LoginDados = {
    email: string 
    password: string
}

export default function Login() {
    const {
        register, 
        handleSubmit,
        formState: {isLoading, errors},
    } = useForm<LoginDados>({
        resolver: yupResolver(validacaoLogin),
        
    });

    const { login } = useAuth()
    const {isOpen: IsShowing, onToggle} = useDisclosure()


    const onSubmit = async (data: LoginDados) => {
        const isLogged = await login (data)
        if (isLogged) {
            setTimeout(() => {
            window.location.href = '/'
            },2000 )
        }
    }
    
    
    return(

        <Flex 
        direction="column"
        as="main"
         minW="40vw"
         bg="white"
         padding={8}
         borderRadius="10px"
         boxShadow="0 8px 32px rgba(0,0,0,0.2)" 
          >
            <Heading 
            fontSize="2rem">
                Login
            </Heading>
            <Flex 
            as="form" 
            borderTop="1px solid rgba(0,0,0,0.1)"
             mt={2}
             direction="column"
             gap={5}
             pt={2}
             onSubmit={handleSubmit(onSubmit)}
             >
                <Input
                id="email"
                type="email"
                label="E-mail"
                placeholder="nicolly@email.com" 
                {...register('email')}
                error={errors.email}
                />
                <Flex>
                <Input 
                id="password"
                type={IsShowing ? 'text' : 'password'}
                label="Senha"
                {...register('password')}
                error={errors.password}
                 />
                 <IconButton 
                 aria-label="Trocar a visibilidade de senha"
                 onClick={onToggle}
                 icon={IsShowing ? <FaEye/> : <FaEyeSlash/>}
                 />

               </Flex>

               <Button type="submit" colorScheme="green" isLoading={isLoading}>Entrar</Button>

             </Flex>
             <Flex as="footer" borderTop="1px solid rgba(0,0,0,.1)"
             mt={4}
             pt={4}>
                <Text>
                    Ainda não possui conta? {''}
                    <Link href="/cadastro" fontWeight={600} color="blue.200">Cadastre-se</Link>
                </Text>
             </Flex>
        </Flex>
     
      )
}