import { ReactNode } from "react";
import { Providers } from "./app/providers"

interface RootLayoutProps{
    children:ReactNode;
}

export default function RootLayout({children} :RootLayoutProps){
    return( <html lang="pt-br">
        <body>
            <Providers>{children}</Providers>
        </body>
    </html>
    );
}