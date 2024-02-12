import { Header } from "./Header/Header"
import { Footer } from "./Footer/Footer"

export function AppLayout({ children }: any) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
