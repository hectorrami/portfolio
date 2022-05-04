import { useState } from 'react'
import MaterialCard from './components/MaterialCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my portfolio!</h1>
        <MaterialCard />
      </header>
      <div>
        <h1>Check out some of the tools that I use to be a successful programmer.👇</h1>
        <div className='container'>
          <div>
            <h2>Programming Languages</h2>
            <ul><a href="https://javascript.info/">JavaScript</a></ul>
            <ul><a href="https://www.typescriptlang.org/">TypeScript</a></ul>
          </div>
          <div>
            <h2>Libraries and Frameworks</h2>
            <ul><a href="https://reactjs.org/">React</a></ul>
          </div>
          <div>
            <h2>Coding Games</h2>
            <ul><a href="https://flexboxfroggy.com/">Learn FlexBox with Flexfroggy</a></ul>
            <ul><a href="https://vim-adventures.com/">Learn Vim with Vim-adventures</a></ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
