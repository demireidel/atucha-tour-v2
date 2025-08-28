import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Atucha II — Premium Virtual Nuclear Tours",
  description:
    "Experience the engineering marvel of Atucha II nuclear power plant through immersive 3D virtual tours. Professional-grade educational platform for engineers and industry professionals.",
  keywords: ["nuclear power", "virtual tour", "engineering", "Atucha II", "3D visualization", "education"],
  authors: [{ name: "Nuclear Engineering Education Platform" }],
  creator: "v0.app",
  publisher: "Vercel",
  robots: "index, follow",
  openGraph: {
    title: "Atucha II — Premium Virtual Nuclear Tours",
    description: "Immersive 3D virtual tours of Argentina's most advanced nuclear power plant",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atucha II — Premium Virtual Nuclear Tours",
    description: "Experience nuclear engineering excellence through immersive 3D tours",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
