import './globals.css'
import View from '../views/view'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'gain online',
  description: 'gain portfolio spread',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={inter.className}>
      <html lang="en" />
      <View>
        {children}
      </View>
    </body>
  )
}