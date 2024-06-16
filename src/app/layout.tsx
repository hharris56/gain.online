import './globals.css'
import View from '../views/view'
import { Inter } from 'next/font/google'
import React from 'react'
import noSsr from '../hooks/noSsr'
import NoSsr from '../hooks/noSsr'

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
        <NoSsr>
        <View>
          {children}
        </View>
        </NoSsr>
      </body>
    </>
  )
}