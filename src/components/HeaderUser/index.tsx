import { Button, Flex, HStack, Heading, IconButton, Text, Menu, MenuButton, MenuList, MenuItem, Portal, } from "@chakra-ui/react"
import Link from "next/link"
import { FC } from "react"
import { FaCog, FaDoorOpen, FaUserAlt, FaUserCog } from "react-icons/fa"
import { CheckoutButton } from "../CheckoutButton"




export const HeaderUser: FC = () => {
    return (
        <Flex
            position="fixed"
            justify="space-between"
            p={4}
            zIndex={999}
            w="100%"
            bg="gray.50"
            align="center"

        >
            <Heading fontSize="1rem">MyFood</Heading>
            <HStack>
            <Menu>
<MenuButton
as={IconButton}
aria-label="Informações do Usuário"
icon={<FaUserAlt />}
/>
<MenuList>
<MenuItem as={Link} href="/" icon={<FaUserCog />}>
Perfil
</MenuItem>
<MenuItem as={Link} href="/" icon={<FaCog />}>
Configurações
</MenuItem>
<MenuItem as={Link} href="/" color="red.500" icon={<FaDoorOpen />}>
Sair
</MenuItem>
</MenuList>
</Menu>
<CheckoutButton/>
            </HStack>
        </Flex>
    )
}