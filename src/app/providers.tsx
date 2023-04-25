'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { tema } from '@/config/tema'
import { ReactNode, FC } from 'react'

interface ProvidersProps {
  children: ReactNode
}
export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={tema}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
