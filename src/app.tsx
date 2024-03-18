import * as React from 'react'
import { createRoot } from 'react-dom/client'
import '../src/assets/style.css'
import { Provider } from 'react-redux'
import { store } from './shared/store/store'
import { Main } from './app/main'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
