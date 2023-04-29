'use client'
import { CardProduto } from '@/components/CardProduto'
import { CardProdutoHorizontal } from '@/components/CardProdutoHorizontal'
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
    <Flex as="section" direction="column" grow={1} maxW="1200px " mt={2}>
        <Heading fontSize="1rem">Destaques</Heading>
        <Divider/>

        <Flex wrap="wrap" gap={6} mt={2}>
            <CardProduto descricao="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus perspiciatis ipsum nobis officia, nulla animi suscipit error corporis tempora mollitia fugit consequuntur id minima saepe nam explicabo alias expedita quisquam." 
            image="https://placehold.co/398x157" 
            preco={19.70} 
            nome="Grande Méqui" 
            />
            <CardProduto descricao=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus perspiciatis ipsum nobis officia, nulla animi suscipit error corporis tempora mollitia fugit consequuntur id minima saepe nam explicabo alias expedita quisquam." 
            image="https://placehold.co/398x157"
             preco={28.69} 
             nome="Quadra" 
             />
            <CardProduto descricao="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus perspiciatis ipsum nobis officia, nulla animi suscipit error corporis tempora mollitia fugit consequuntur id minima saepe nam explicabo alias expedita quisquam." 
            image="https://placehold.co/398x157" 
            preco={30.75}
             nome="EmiCi Lanchinho felizinho" 
             />
            <CardProduto descricao="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus perspiciatis ipsum nobis officia, nulla animi suscipit error corporis tempora mollitia fugit consequuntur id minima saepe nam explicabo alias expedita quisquam."
             image="https://placehold.co/398x157" 
             preco={15.78} 
             nome="EmiCi frango" 
             />

        </Flex>
    </Flex>
    <Flex 
    as="section"
    direction="column" 
    grow={1}
    mt={2}
    maxH="1200px"
    >
        <Heading fontSize="1rem">Produtos</Heading>
        <Divider/>
        <Flex
         direction={{base: 'column', md: 'row'}}  
        gap={4}
        wrap="wrap" 
        mt={2}
        p={1}
        >
            <CardProdutoHorizontal
            descricao="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora earum in aliquid vel temporibus laboriosam hic, praesentium reiciendis consequatur accusantium nam sapiente ex consectetur, expedita quis maxime? Pariatur, nam illo."
            image="https://placehold.co/398x157"
            preco={15.78}
            nome="EmiCi galinha"
            />
            <CardProdutoHorizontal
            descricao="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora earum in aliquid vel temporibus laboriosam hic, praesentium reiciendis consequatur accusantium nam sapiente ex consectetur, expedita quis maxime? Pariatur, nam illo."
            image="https://placehold.co/398x157"
            preco={15.78}
            nome="EmiCi galinha"
            />
            <CardProdutoHorizontal
            descricao="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora earum in aliquid vel temporibus laboriosam hic, praesentium reiciendis consequatur accusantium nam sapiente ex consectetur, expedita quis maxime? Pariatur, nam illo."
            image="https://placehold.co/398x157"
            preco={15.78}
            nome="EmiCi galinha"
            />
        </Flex>   
        </Flex>
         </Flex>
   )
}
