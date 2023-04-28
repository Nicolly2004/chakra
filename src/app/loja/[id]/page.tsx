'use client'
import { CardProduto } from '@/components/CardProduto'
import { StarRating } from '@/components/StarRating'
import { Button, Card, CardBody, Divider, Flex, Heading, Icon, Image, Stack, Text} from '@chakra-ui/react'
import { use } from 'react'
import { AiFillDollarCircle } from 'react-icons/ai'

type LojaProps = {
    params: {
        id:string
    }
}


export default  function Loja({params:{ id }}: LojaProps) {
    const dadosLoja: any =  use 
    (new Promise((resolver) => {
        setTimeout(
            ()=>
            resolver({
            nome:'EmiCi Donaldi', 
            nota:4.5 ,
            categoria:"Lanches" ,
            distancia:"1.2km" ,
            tempo:'30-40min',
            taxaEntrega:2.25,
            pedidoMinimo:75.5
        }),
         3* 1000
         )
    }),
    )

   const moneyFormatter = new Intl.NumberFormat('pt-br', {
   style: 'currency',
   currency:'BRL',
   })

   return ( 
   <Flex
    w="95vw" 
    minH="100vh"
    marginX="2.5vw"
    direction="column"
    align="center"
    justify="flex-start"
    mt={2}
    overflowX="hidden"
    >
    <Flex as="header" direction="column">
        <Image
         src="https://placehold.co/1200x200"
         alt={"Imagem de capa da empresa: " + dadosLoja.nome}
         borderRadius="10px"
        />
        <Flex align="center" gap={4} mt={2}>
            <Image
             src="https://placehold.co/100" 
            alt={'Logo da empresa: ' + dadosLoja.nome}
            borderRadius="full"
            />
            <Heading fontSize="1.5rem">{dadosLoja.nome}</Heading>
            <StarRating nota={dadosLoja.nota} />
            <Flex ml="auto" gap={5}>
                <Button variant="link" colorScheme="red">
                    Ver Mais
                </Button>

                <Text 
                as="small" 
                verticalAlign="center" 
                display="flex" 
                alignItems="center"
                justifyContent="center"
                gap="3px"
                >
                    <Icon as={AiFillDollarCircle} />
                    Pedido Mínimo {dadosLoja.pedidoMinimo}
                </Text>
            </Flex>
        </Flex>
    </Flex>
    <Flex as="section" direction="column" grow={1} maxW="1200px">
        <Heading fontSize="1rem">Destaques</Heading>
        <Divider/>

        <Flex wrap="wrap" gap={6}>
            <CardProduto descricao="" image="" preco={0} nome="" />
            <CardProduto descricao="" image="" preco={0} nome="" />
            <CardProduto descricao="" image="" preco={0} nome="" />
            <CardProduto descricao="" image="" preco={0} nome="" />

        </Flex>
    </Flex>
   </Flex>
   )
}