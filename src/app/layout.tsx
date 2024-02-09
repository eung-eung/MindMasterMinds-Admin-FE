
import ProvidersWrapper from '@/app/components/ProvidersWrapper'
import './globals.css'
import Navbar from './components/Navbar/NavBar'


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
          <Navbar />
          <div style={{ marginLeft: '20%', paddingLeft: '5%' }}>
            {children}
          </div>

        </ProvidersWrapper>
      </body>
    </html>
  )
}
