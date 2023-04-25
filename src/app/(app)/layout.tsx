'use client'
import { Header } from '@/components/Header'
import { Flex, useDisclosure } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const {isOpen, onToggle} = useDisclosure()
  return (
  <Flex direction="column">
    <Header isOpen={isOpen} onToggle={onToggle} />
    <Flex mt="130px">{children}</Flex>
    </Flex>
  )
}
