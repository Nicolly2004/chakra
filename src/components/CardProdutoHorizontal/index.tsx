import { FC } from "react";
import { CardProdutoProps } from "../CardProduto";
import {
     Card,
    CardBody,
    CardFooter,
    Heading,
    Image, 
    Stack, 
    Text 
} from "@chakra-ui/react";
import { formataMoeda } from "@/helpers/formataMoeda";
import { useCart } from "@/contexts/CartContext";



export const CardProdutoHorizontal : FC<CardProdutoProps> = ({
   produto:{ nome,
    imagem,
    descricao,
    preco,
    id},
    handleOpenModal
}) => {

    return (
     <Card
      overflow="hidden"
      onClick={() => handleOpenModal(id)}
       direction="row"  
       _hover = {{transform: 'scale(1.01)'}}
       transition="all 0.2s"
       >
        <Image 
        src={imagem} 
        alt={'produto:' + nome}
         objectFit="cover"
         height="380px"
         widht="220px"
          />
        <Stack>
            <CardBody>
                <Heading size="md">{nome}</Heading>
                <Text py={2}>{descricao}</Text>
            </CardBody>
            <CardFooter>
                <Text color="green.500">{formataMoeda(preco)}</Text>
            </CardFooter>
        </Stack>
    </Card>
    )
}