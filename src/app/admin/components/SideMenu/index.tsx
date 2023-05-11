import { Icon ,Flex} from "@chakra-ui/react";
import { FC } from "react";
import { SideMenuItem } from "./SideMenuItem";
import { FaBox, FaHome, FaStore } from "react-icons/fa";



export const SideMenu: FC = () => {
     const menuOptions = [
        {
            icon: FaHome,
            title: 'início',
            path: '/admin'
        },{
            icon: FaStore,
            title: 'Lojas',
            path: '/admin/lojas'
        },
        {
            icon: FaBox,
            title: 'Produtos',
            path: '/admin/produtos'
        },

     ]


    return ( 
    <Flex as="aside" grow={1} direction="column" maxH="200px">
        <Flex grow={1} direction="column" minH="100vh">
            {menuOptions.map((menuItem, i) => (
                <SideMenuItem
                key={i}
                icon={menuItem.icon}
                title={menuItem.title}
                path={menuItem.path}
                />
            ))}
        </Flex>
        </Flex>

    )
}