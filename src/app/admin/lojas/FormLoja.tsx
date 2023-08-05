import { apagaLoja, cadastraLoja, listarLojas } from "@/services/lojaService";
import { Text, Button, Flex, FormControl, FormLabel, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, Image, FormErrorMessage, Spinner } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Input } from '@/components/Input'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { AdminHeader } from "../components/AdminHeader";
import { getBase64 } from '../../../helpers/getBase64'
import { formataMoeda } from "@/helpers/formataMoeda";
import { notify } from "@/config/toast";
import { useQuery, useQueryClient } from "react-query";
import { useState, FC } from "react";
import { ConfirmDelete } from "../components/ConfirmDelete";
import { FormularioLoja } from './page'
import { Loja } from '@/services/lojaService'


const validacaoLoja = yup.object().shape({
    nome: yup.string().required('Informe o nome da loja.'),
    categoria: yup.string().required('Informe a categoria da loja'),
    tempo: yup.string().required('Informe o tempo de preparo.'),


    logo: yup
        .mixed()
        .test('type', 'Envie uma imagem no formato JPG ou PNG', (value: any) => {
            if (value.length > 0) {
                return value[0].type === 'image/png' || value[0].type === 'image/jpeg'
            }
            return false
        })
        .required('Informe o logo da loja'),

    cover: yup
        .mixed()
        .test('type', 'Envie uma imagem no formato JPG ou PNG', (value: any) => {
            if (value.length > 0) {
                return value[0].type === 'image/png' || value[0].type === 'image/jpeg'
            }
            return false
        })
        .required('Informe a capa da loja'),

    pedidoMinimo: yup
        .string()
        .transform((value: string) => {
            if (!value) return '0'

            return (Number(value.replace(/\D/g, '')) / 100).toString()
        })

        .test({
            name: 'pedido-minimo',
            message: 'O pedido mínimo deve ser maior ou igual a R$ 0,00',
            test: (value) => {
                if (!value) return false

                return Number(value) >= 0
            },
        })
        .required('Informe o pedido Mínimo'),

    taxaEntrega: yup
        .string()
        .transform((value: string) => {
            if (!value) return '0'

            return (Number(value.replace(/\D/g, '')) / 100).toString()
        })

        .test({
            name: 'taxa-entrega',
            message: 'O valor da taxa deve ser maior ou igual a R$ 0,00',
            test: (value) => {
                if (!value) return false

                return Number(value) >= 0
            },
        })
        .required('Informe a taxa de entrega'),
})


interface FormLojaProps {
    isOpen: boolean
    onClose: () => void
    loja?: Loja
    salvarLoja: (loja: FormularioLoja) => Promise<void>
}


export const FormLoja: FC<FormLojaProps> = ({
    isOpen,
    onClose,
    salvarLoja,
    loja,
}) => {
    const lojaData: FormularioLoja = {...loja,cover: '',logo:''}
    const {
        register,
        handleSubmit,
        formState:{errors},
        watch, 
        setValue,
        reset,
    } = useForm<FormularioLoja>({
     resolver: yupResolver(validacaoLoja),
     defaultValues: lojaData,
    })

const handleSalvarLoja = (loja: FormularioLoja) => {
    salvarLoja(loja)
    reset()
}

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{loja? "Editar Loja" : 'Nova Loja'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex 
                    as="form" 
                    p={4} 
                    direction="column" 
                    gap={1} 
                    onSubmit={handleSubmit(handleSalvarLoja)} 
                    >
                        <Input 
                        label='Nome'
                         type="text"
                          id="nome"
                          {...register('nome')} 
                          error={errors.nome} 
                          />

                        <Input 
                        label='Categoria' 
                        type="text" 
                        id="categoria" 
                        {...register('categoria')} 
                        error={errors.categoria} 
                        />

                        <Input 
                        label='Tempo de Preparo'
                         id="tempo" 
                         type="text"
                          {...register('tempo')} 
                          error={errors.tempo}
                           />

                        <Input 
                        label="Pedido minimo"
                         type="text" 
                         id="pedidoMinimo" 
                         error={errors.pedidoMinimo}
                          {...register('pedidoMinimo')}
                            onChange={({ target }) => {
                                setValue(
                                    'pedidoMinimo',
                                    formataMoeda(Number(target.value.replace(/\D/g, '')) / 100),
                                )
                            }}
                        />
                        <Input label="Taxa de entrega" type="text" id="taxaEntrega" error={errors.taxaEntrega} 
                            onChange={({ target }) => {
                                setValue(
                                    'taxaEntrega',
                                    formataMoeda(Number(target.value.replace(/\D/g, '')) / 100),
                                )
                            }}
                        />
                        <Input type="file" label="Logo" id="logo" {...register('logo')} display={'none'} />

                        <FormControl isInvalid={!!errors.logo}>
                            <FormLabel htmlFor="logo">

                                <Image
                                    alt='imagem do logo'
                                    src={
                                        typeof watch('logo') !== 'undefined' &&
                                            typeof watch('logo')[0] === 'object'
                                            ? URL.createObjectURL(watch('logo')[0])
                                            : 'https://placehold.it/100x100'
                                    }
                                    w="100px"
                                    h="100px"
                                    objectFit="cover"
                                    cursor={'pointer'}
                                />

                            </FormLabel>
                            
                            {!!errors.logo && (
                                <FormErrorMessage>
                                    {errors.logo?.message as String}
                                </FormErrorMessage>
                            )}

                        </FormControl>
                        <Input type="file" label="Capa" id="cover" {...register('cover')} display={'none'} />
                        <FormControl isInvalid={!!errors.cover}>
                            <FormLabel htmlFor="cover">
                                <Image
                                    alt="imagem da capa"
                                    src={
                                        typeof watch('cover') !== 'undefined' &&
                                            typeof watch('cover')[0] === 'object'
                                            ? URL.createObjectURL(watch('cover')[0])
                                            : 'https://placehold.co/1200x1250'
                                    }
                                    w="100%"
                                    h="250px"
                                    objectFit="cover"
                                    cursor={'pointer'}
                                />
                            </FormLabel>
                            {!!errors.cover && (
                                <FormErrorMessage>{errors.cover?.message as String}</FormErrorMessage>
                            )}
                        </FormControl>



                        <Button type="submit" colorScheme="green">
                            Salvar
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>

    )
}