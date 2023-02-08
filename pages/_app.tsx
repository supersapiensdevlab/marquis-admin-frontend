import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { DatabaseProvider } from '../lib/DatabaseContext'

export default function App({ Component, pageProps }: AppProps) {
  return ( <DatabaseProvider>
  <Component {...pageProps} />
</DatabaseProvider>)
}
