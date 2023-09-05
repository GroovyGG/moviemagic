import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie Magic!',
  description: 'A movie database interactive tool!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className + " bg-gradient-to-br from-gray-100 to-white"}>
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 transition-all duration-500">
          <Navbar/>
          
          <main className="mt-8">
            {children}
            
          </main>
        </div>
      </body>
    </html>
  );
}
