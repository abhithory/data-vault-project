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
        <ThirdWebProvider>
          <Web3ConnectionWrapper>
              <AppNavigation />
              {children}
          </Web3ConnectionWrapper>
        </ThirdWebProvider>
  )
}
