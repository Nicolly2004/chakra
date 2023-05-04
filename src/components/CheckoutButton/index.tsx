
import { useCart } from "@/contexts/CartContext";
import { formataMoeda } from "@/helpers/formataMoeda";
import { Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, StackItem, Text, Image, IconButton, PopoverFooter} from "@chakra-ui/react";
import { FC } from "react"
import { FaCreditCard, FaShoppingBasket, FaTrashAlt } from "react-icons/fa";

export const CheckoutButton: FC = () => {
    const { quantidade, valor, produtos} = useCart()
    
    return (
        <Popover>
            <PopoverTrigger>
                <Button 
                    onClick={() => console.log('clique')}
                    leftIcon={<FaShoppingBasket/>}
                    >
                

                <Flex direction="column" fontSize="10px" fontWeight={500}>
                    <Text>{formataMoeda(valor)}</Text>
                    <Text>{quantidade} Itens</Text>
                </Flex>
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Seus Itens</PopoverHeader>
                <PopoverBody>
                    <Stack>
                        {produtos.map((produto, i) => (
                            <StackItem key={i}>
                           <Flex gap={3} align="center">
                            <Image 
                            src={produto.imagem}
                             w={8}
                             h={8} 
                             fit="cover"
                             alt={`Imagem do produto ${produto.nome}`}
                             borderRadius="full"
                              />
                              <Flex direction="column">
                              <Text fontWeight={700} fontSize="12px" noOfLines={1}>
                                {produto.nome}
                                </Text>

                              <Text fontWeight={500} fontSize="12px">
                                {produto.quantidade} x{' '}
                                {formataMoeda(produto.preco * produto.quantidade)}
                              </Text>
                              </Flex>
                              <IconButton
                              aria-label="Remover Item"
                              icon={<FaTrashAlt />}
                              colorScheme="red"
                              ml="auto"
                              />
                           </Flex>
                            </StackItem>
                        ))}
                    </Stack>
                    </PopoverBody>
                    <PopoverFooter>
                        <Button
                         width="100%"
                          colorScheme="green" 
                          leftIcon={<FaCreditCard/>}>
                            Ir para Formas de Pagamento
                        </Button>
                    </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
}