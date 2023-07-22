import ThirdWebProvider from '@/components/provider/ThirdWebProvider'
import '@/style/globals.css'
import Web3ConnectionWrapper from '@/web3Connection/Web3ConnectionContext'
import AppSidebar from '@/components/Sections/Nav/AppSidebar'
import AnimationProvider from '@/components/provider/AnimationProvider'
import AnimationDivProvider from '@/components/provider/AnimationDivProvider'


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
          <div className="w-full h-screen overflow-x-hidden overflow-y-auto">
            <AnimationDivProvider className="w-full h-full">
              {/* <AppNavigation /> */}
              {children}
            </AnimationDivProvider>
          </div>
        </div>
      </Web3ConnectionWrapper>
    </ThirdWebProvider>
  )
}
