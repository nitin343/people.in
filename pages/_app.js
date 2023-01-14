import Layout from '../component/Layout'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'
import { auth } from '../firebase'
import { Provider } from 'react-redux'
import reduxStore from '../redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
    <AuthProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} className='custom' />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
    </Provider>

  )
}
