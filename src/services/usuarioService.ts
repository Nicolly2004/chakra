

export interface Endereco {
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    cep: string
}

export interface Usuario {
    id: string
    nome: string 
    email: string
    endereco?: Endereco
}

export const obterUsuarios = (): Usuario[] => {
    return [
        {
            id: '1',
            nome: 'Nicolly Reis Silva',
            email:'nick.eu2005@gmail.com',
            endereco: {
                logradouro: 'Rua vinhedo',
                numero: '365',
                complemento: 'Casa 1',
                bairro: 'Etelvina',
                cidade: 'São Paulo',
                estado: 'SP',
                cep: '08265-987'
            },
        },
    ]}

export const obterUsuario = (id: string): Usuario | undefined => {
        return obterUsuarios().find((usuario) => usuario.id === id)
    }