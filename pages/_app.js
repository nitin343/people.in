import Layout from '../component/Layout'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>

  )
}
