import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { FC } from "react"

interface ModalProdutoPops{
    isOpen: boolean
    onClose: () => void
    id: string
}


export const ModalProduto: FC<ModalProdutoPops> = ({
    isOpen,
     onClose,
    id,
}) =>{
    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <Text>Produto</Text>
                    <ModalCloseButton ></ModalCloseButton>
                </ModalHeader>
            </ModalContent>
        </ModalOverlay>
    </Modal>
}