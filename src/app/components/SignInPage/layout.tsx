import ProvidersWrapper from '@/app/components/ProvidersWrapper'




export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <head>

            </head>
            <body>
                {children}
            </body>
        </html>
    )
}