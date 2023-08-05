import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@chakra-ui/next-js'
import { 
    IconButton,
        Menu,
        MenuButton,
        MenuList,
        MenuItem,
        Button,
} from "@chakra-ui/react";
import { redirect } from 'next/navigation';
import { FC } from "react";
import { FaCog, FaDoorOpen, FaUserAlt, FaUserCog} from "react-icons/fa";



export const UserMenu : FC = () => {

    const{logout, hasPermission} = useAuth()
        return (
            <Menu>
    <MenuButton
    as={IconButton}
    aria-label="Informações do Usuário"
    icon={<FaUserAlt />}
    />
    <MenuList>
    <MenuItem as={Link} href="/perfil" icon={<FaUserCog />}>
    Perfil
    </MenuItem>
    {hasPermission('Administrador') && (
        <MenuItem as={Link} href="/admin" icon={<FaCog />}>
        Painel de ADM
        </MenuItem>
    )}
        <MenuItem 
        as={Button} 
        onClick={() => {
            logout() 
            redirect('/')
        }} 
            color="red.500" 
            icon={<FaDoorOpen />}>
        Sair
        </MenuItem>
        </MenuList>
        </Menu>
   
        )
    }
        
