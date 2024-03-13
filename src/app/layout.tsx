import './globals.css'
import Page from '../views/view'

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
      <Page>
        {children}
      </Page>
    </html>
  )
}