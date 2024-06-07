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
    <>
      <html lang="en"></html>
      <body className={"webpage-background " + inter.className}>
        <View>
          {children}
        </View>
      </body>
    </>
  )
}