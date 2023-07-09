import ThirdWebProvider from '@/components/provider/ThirdWebProvider'
import '@/style/globals.css'
import Web3ConnectionWrapper from '@/web3Connection/Web3ConnectionContext'
import AppNavigation from '@/components/Sections/Nav/AppNavigation'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='body bg_primary text-text-color'>
        <ThirdWebProvider>
          <Web3ConnectionWrapper>
              <AppNavigation />
              {children}
          </Web3ConnectionWrapper>
        </ThirdWebProvider>
      </body>
    </html>
  )
}
