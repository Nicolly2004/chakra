import { Produto,createProduto, updateProduto } from "@/services/produtoService"
import { Button, Flex, FormControl, FormErrorMessage, FormLabel,  Modal, ModalBody, ModalCloseButton,Textarea, ModalContent, ModalHeader, ModalOverlay, Select, Image} from "@chakra-ui/react"
import { FC } from "react"
import { Input } from "@/components/Input"
import { Loja } from "@/services/lojaService"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { formataMoeda } from "@/helpers/formataMoeda"


const validacaoProduto = yup.object().shape({
    nome: yup.string().required('Informe o nome do produto'),
    descricao: yup.string().required('Informe a descrição do produto'),

    preco: yup.string().transform((value: string) => {

        if (!value) return '0'
        return (Number(value.replace(/\D/g, '')) / 100).toString()
    })

    .test({
        name:'preço-minimo',
        message: 'O preço mínimo deve ser R$ 0,00',
        test: (value) => {
            console.log(value)
            if (!value) return false
            console.log(value)
            return Number(value) > 0
        },
    },
)
    .required('Informe o preço do produto'),

    loja_id: yup.string().required('Informe a loja do produto'),
    desconto: yup.number().transform((value) => {
        if (!value) return 0
        return Number(value.replace(/\D/g, '')) / 100
    }),
})

interface ModalProdutoProps {
    isOpen: boolean
    onClose: () => void 
    produto?: Produto
    lojas: Loja[]
}


interface ProdutoForm {
    nome:string
    descricao: string 
    preco: number | string
    desconto: number | string
    loja_id: string | number
    imagens: FileList
}


export const ModalProduto: FC<ModalProdutoProps> = ({
     isOpen, 
     onClose,
    lojas,
    produto,
}) => {
    const {register, handleSubmit, formState: {errors,isSubmitting},setValue, watch} = useForm<ProdutoForm>({
        resolver: yupResolver(validacaoProduto),
    })
    const submitProduto = (data: ProdutoForm) => {
        if(produto) {
            updateProduto<ProdutoForm>(produto.id, data)
            return;
        }
        createProduto<ProdutoForm>(data)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Novo Produto</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Flex as="form" p={4} direction="column" gap={1} onSubmit={handleSubmit(submitProduto)}>
                
                <Input
                label="Loja"
                id="loja_id"
                type="text"
                as={Select}
                variant="flushed"
                {...register('loja_id')}
                placeholder="Selecione a loja..."
                error={errors.loja_id}
                >
                    {lojas.map((loja) => (
                        <option key={loja.id} value={loja.id}>
                            {loja.nome}
                        </option>
                    ))}
                </Input>
                <Input
                 label="Nome do produto" 
                 id="nome" 
                 type="text"
                  {...register('nome')}
                  error={errors.nome}
                  />
                <Input 
                label="Descrição" 
                id='descricao'
                as={Textarea}
                 type="text"  
                 {...register('descricao')}
                 error={errors.descricao}
                 />
               <Input 
               label="Preço"
                id="preco"
                 type="text"
                {...register('preco')}
                error={errors.preco}
                onChange={(evento) => {
                    setValue('preco',formataMoeda(Number(evento.target.value.replace(/\D/g, '')) / 100,
                    ),
                 )
            }}
                   />
               <Input
                label="Desconto" 
                id="desconto" 
                type="text" 
                 {...register('desconto')}
                 error={errors.desconto}
                onChange={(evento) => {
                    setValue('desconto',formataMoeda(Number(evento.target.value.replace(/\D/g, '')) / 100,
                    ),
                 )
                }}
                />
             <FormControl>
                <FormLabel htmlFor="imagens">Imagens do produto</FormLabel>
                <input
                type="file"
                id="imagens"
                {...register('imagens')}
                multiple
                />
                <Flex gap={2} wrap="wrap" mt={2}>
                    {[
                        ...new Array(
                            typeof watch('imagens') !== 'undefined'
                            ? watch('imagens').length
                            :0,
                        ),
                    ].map((value, index) => {
                        return (
                        <Image
                        maxW="100px"
                        alt="Preview de imagem"
                         key={index} 
                        src={URL.createObjectURL(watch('imagens').item(index) as File,
                        )}
                        />
                        )
                    })}

                    </Flex>
             </FormControl>
               <Button colorScheme="green" type="submit" mt={2} isDisabled={isSubmitting}>
                Salvar
               </Button>
                </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}