'use client'

import { 
        Accordion,
        AccordionButton,
        AccordionIcon,
        AccordionItem,
        AccordionPanel,
        Button,
        Flex,
        Icon,
        Text 
    } from "@chakra-ui/react"
import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";


export default function PerfilPage(){
    const {register, setValue, watch} = useForm()
    const {userData} = useAuth()

    useEffect(() => {
        if(!userData) return
        setValue('user.email',userData.email)
        setValue('user.nome',userData.nome)

        if(!userData.email) return
        setValue('endereco.cep',userData.endereco?.cep.toString() || '')
        setValue('endereco.rua',userData.endereco?.logradouro || '')
        setValue('endereco.bairro',userData.endereco?.bairro || '')
        setValue('endereco.cidade',userData.endereco?.cidade || '')
        setValue('endereco.uf',userData.endereco?.estado || '')
        setValue('endereco.complemento',userData.endereco?.complemento || '')
    },[userData, setValue])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const buscaCEP = async (cep:string) =>{
        try {
        const cepFormatado = cep.replace('-', '')
        const response = await fetch (
            `https://viacep.com.br/ws/${cepFormatado}/json`,
            )
            const respondeJson = await response.json()

            if(!respondeJson) return null
            setValue('endereco.rua', respondeJson.logradouro)
            setValue('endereco.bairro', respondeJson.bairro)
            setValue('endereco.localidade', respondeJson.localidade)
            setValue('endereco.uf', respondeJson.uf)
    } catch (error: any){
        console.log(error)
    }
  }
    
    /**
     * Não precisa do useEffect quandp usar a função no onChange do input
     */
    useEffect(() => {
        const cep = watch('endereco.cep')
        if(cep.replace('-', '').length === 8) {
            buscaCEP(cep)
        }
    }, [buscaCEP,watch,watch('endereco.cep')])


    return (
    <Flex align="center" gap={4} as="main" direction="column" grow={1}>
        <Flex as="form" direction="column" gap={5} grow={1}>
        <Accordion minW="500px" allowToggle allowMultiple>
            <AccordionItem>
                <AccordionButton>
                    <Text flex={1}>Informações Pessoais </Text>
                    <AccordionIcon/>
                </AccordionButton>
                <AccordionPanel >
                    <Flex 
                     direction="column"
                     borderRadius="7px" 
                     boxShadow="5px 8px 15px rgba(0,0,0,.2)"
                     p={4}
                     >
                        <Input label='Nome' id="nome" type="text"{...register('user.nome')}/>
                        <Input label="E-mail" id="email" type="email" {...register('user.email')}/>
                    </Flex>
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <AccordionButton>
                    <Text flex={1}>Alterar a Senha</Text>
                    <AccordionIcon/>
                </AccordionButton>
                <AccordionPanel>
                    <Flex
                    direction="column"
                    borderRadius="7px" 
                    boxShadow="5px 8px 15px rgba(0,0,0,.2)"
                    p={4}
                    >
                        <Input label="Senha antiga" id="senha-antiga" type="password"/>
                        <Input label="Senha nova" id="senha-nova" type="password"/>
                        <Input label="Repita a senha nova" id="senha-nova-confirm" type="password" />
                    </Flex>
                </AccordionPanel>
            </AccordionItem>
       

        <AccordionItem>
          <AccordionButton>
            <Text flex={1}>Endereço</Text>
            <AccordionIcon/>
          </AccordionButton>
          <AccordionPanel>
            <Flex
            direction="column"
            borderRadius="7px" 
            boxShadow="5px 8px 15px rgba(0,0,0,.2)"
            p={4}
            gap={2}
            >
                <Input
                 label="CEP" 
                 id="cep" 
                 type="text" 
                 {...register("endereco.cep")}
                 onChange={(evento) => {
                    const cep = evento.target.value.replace(/\D/g,'')
                    /**
                     * Não precisa fazer esse se optar por useEffect
                     */
                    if(cep.length >= 8) {
                        buscaCEP(cep)
                    }
                    const mask = cep.replace(/(\d{5})(\d)/,'$1-$2')
                    setValue('endereco.cep', mask)
                 }}
                 maxLength={9}
                 />

                <Input 
                label="Rua"
                id="rua"
                type='text'  
                {...register("endereco.rua")}
                />

                <Input 
                label="Bairro"
                id="bairro" 
                type="text" 
                {...register("endereco.bairro")}
                />

                <Flex gap={5}> 
                    <Input
                     label="Cidade" 
                     id="cidade" 
                     type="text" 
                     {...register("endereco.cidade")}
                     />

                    <Input
                     label="UF"
                     id="uf"
                     type="text" 
                     {...register("endereco.uf")}
                     />

                </Flex>

                <Input
                label="Complemento" 
                id="complemento"
                type='text'  
                {...register("endereco.complemento")}
                />

            </Flex>
          </AccordionPanel>
        </AccordionItem>
        </Accordion>
        <Button 
        type="submit"
        leftIcon={<Icon as={FaSave} />} colorScheme="green">
            Salvar
            </Button>
        </Flex>
    </Flex>
    )
}