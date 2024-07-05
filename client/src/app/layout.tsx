import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"





const inter = Inter({ subsets: ["latin"] })





export const metadata: Metadata = {
  title: "MO2 RMT Tracker",
  description: "Help Henrik understand why sub tokens are the way.",
}





const Layout = async function RootLayout({ children }:Readonly<{ children:React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}





export default Layout