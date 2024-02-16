
import ProvidersWrapper from '@/app/components/ProvidersWrapper'
import './globals.css'
import Navbar from './components/Navbar/NavBar'
import LayoutWrapper from './components/LayoutWrapper'



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
        <ProvidersWrapper>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ProvidersWrapper>
      </body>
    </html>
  )
}
