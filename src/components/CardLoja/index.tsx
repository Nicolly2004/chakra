import { FC } from 'react'
import { Flex, Heading, Box, Text, Image,Icon } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { FaStar } from 'react-icons/fa'
import { StarRating } from '../StarRating'


interface CardLojaProps {
path: string 
nome: string
nota: number
tempo: string
taxaEntrega: number
categoria: string
distancia: string
logo?: string
}

export const CardLoja: FC<CardLojaProps> = ({
    path,
    nome,
    nota,
    tempo,
    taxaEntrega,
    categoria,
    distancia,

}) => {

    const moneyFormatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency:'BRL'
    })

    return(
     <Flex 
     as={Link}
     href={path} 
     padding={4} 
     bg="white"
     borderRadius="7px" 
     align="center" 
     justify="space-between"
     _hover={{
        transform:'scale(1.02)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        textDecoration: 'none'
     }}
     transition="all 0.2s"
     >
        <Flex gap={4} align="center" justify="space-between"  >
            <Image
             src="https://placehold.co/100" 
             alt={`Logotipo da Loja ${nome}`}
             borderRadius="full"
             />


            <Flex direction="column" gap={2} >
                <Heading fontSize="1rem">{nome}</Heading>

                <Flex gap={2} fontSize="0.9rem" color="blackAlpha.500">
                    <Box color="yellow.500">
                      <Icon as={FaStar} />{nota}
                      </Box>

                    <Text as="span">•</Text>

                    <Text>{categoria}</Text>

                    <Text as="span">•</Text>

                    <Text>{distancia}</Text>
                </Flex>

                <Flex gap={2} fontSize="0.9rem" color="blackAlpha.500">
                <Text>{tempo}</Text>

                <StarRating nota={nota} />
                
                <Text as="span">•</Text>

                {taxaEntrega > 0 ? (
                <Text>{moneyFormatter.format(taxaEntrega)}</Text>
                ) : (
                    <Text color="green.200">Grátis</Text>
                )}
                
                </Flex>
            </Flex>
        </Flex>
    </Flex>
    )
}


