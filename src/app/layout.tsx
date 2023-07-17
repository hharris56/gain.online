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
      <body className={inter.className} style={{padding: "2rem"}}>
        <Header />
          <div style={{marginBottom: "2rem", fontSize: "1.25em"}}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}