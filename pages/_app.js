import '../styles/globals.css'
import { Provider } from "react-redux"
import store from 'utils/redux/rootReducer'
import { ThemeProvider } from "next-themes"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' enableSystem={true}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
