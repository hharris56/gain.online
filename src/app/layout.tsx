import './globals.css'
import { Inter } from 'next/font/google'
import './layout.css'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'gain online',
  description: 'gain portfolio spread',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <div style={{padding: "2em"}}>
        <Header />
          <div className={inter.className} style={{marginBottom: "2em"}}>{children}</div>
        <Footer />
      </div>
    </html>
  )
}