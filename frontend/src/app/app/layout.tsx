import ThirdWebProvider from '@/components/provider/ThirdWebProvider'
import '@/style/globals.css'
import Web3ConnectionWrapper from '@/web3Connection/Web3ConnectionContext'
import AppNavigation from '@/components/Sections/Nav/AppNavigation'
import AppSidebar from '@/components/Sections/Nav/AppSidebar'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <ThirdWebProvider>
          <Web3ConnectionWrapper>
              {/* <AppNavigation /> */}
              <div className="flex">
                <AppSidebar />
                <div className="w-full">
                    <AppNavigation />
              {children}
                </div>
              </div>
          </Web3ConnectionWrapper>
        </ThirdWebProvider>
  )
}
