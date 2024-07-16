import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"





const inter = Inter({ subsets: ["latin"] })





export const metadata: Metadata = {
  title: "MO2 Watch",
  description: "Tracking RMT in Mortal Online 2.",
  openGraph: {
    title: "MO2 Watch",
    description: "Tracking RMT in Mortal Online 2.",
    url: process.env.NEXT_PUBLIC_OPG_LINK,
    images: [{
      url: `${process.env.NEXT_PUBLIC_OPG_LINK}/opengraph-image.png`,
      width: 217,
      height: 267
    }],
    type: "website"
  }
}





const Layout = async function RootLayout({ children }:Readonly<{ children:React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}





export default Layout