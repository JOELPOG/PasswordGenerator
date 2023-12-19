import React, { useCallback, useEffect, useRef, useState } from 'react';
import './index.css'


function App (){
  const [state, setState] = useState({
    length: 8,
    numberAllowed: false,
    charAllowed: false,
    password: "",
    hasCopied: false,
  })
  const buttonRef = useRef(null)


  const generatePassword = useCallback(() => {
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(state.numberAllowed){
      str += "0123456789"
    }

    if(state.charAllowed){
      str += "!@#$%^&*()_+"
    }

    for(let i=0; i < state.length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)
    }

    setState((prev) => ({...prev, password:password}))
  }, [state.length, state.numberAllowed, state.charAllowed])

  useEffect(() => generatePassword(), [state.length, state.numberAllowed, state.charAllowed])
  
  // const copyPasswordToClipboard = () =>{
  //   window.navigator.clipboard.writeText(state.password)
  //   setState((prev) => ({...prev, copiedButtonCSS: 'bg-green-700', hasCopied: true}))
  //   alert('Copied Sucessfully!')
  // }
  
  // useEffect(() => {setTimeout(() => {
  //   setState((prev) => ({...prev, hasCopied:false, copiedButtonCSS: 'bg-blue-700'}))
  // }, 1000)}, [state.hasCopied])

  const copyPasswordToClipboard = () =>{
    window.navigator.clipboard.writeText(state.password)
    setState((prev) => ({...prev, hasCopied: true}))
    alert('Copied Sucessfully!')
    buttonRef.current.style.backgroundColor = "green"
  }
  
  useEffect(() => {setTimeout(() => {
    setState((prev) => ({...prev, hasCopied:false}))
    buttonRef.current.style.backgroundColor = "blue"
  }, 1000)}, [state.hasCopied])
  return(
    <div className='h-screen flex items-center justify-center bg-gray-500'>
      <div className='w-full max-w-md mx-auto shadow-2xl rounded-lg px-4 py-3 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={state.password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly />
          <button ref={buttonRef} onClick={copyPasswordToClipboard} className='outline-none text-white px-3 py-0.5 shrink-0 '>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 text-white'>
            <input type="range" min={6} max={699} value={state.length} className='cursor-pointer' 
            onChange={(e) => setState((prev) => ({ ...prev, length: e.target.value }))}name="" id="" />
            <label htmlFor='length'>Length: {state.length}</label>
          </div>
          <div className='flex items-center gap-x-1 text-white'>
            <input type="checkbox" defaultChecked={state.numberAllowed} 
            onChange={() => {
              setState((prev) => ({...prev, numberAllowed: !(prev.numberAllowed) }))
            }} name="" id="" />
            <label htmlFor='number'>Number</label>
          </div>
          <div className='flex items-center gap-x-1 text-white'>
            <input type="checkbox" defaultChecked={state.charAllowed} 
            onChange={() => {
              setState((prev) => ({...prev, charAllowed: !(prev.charAllowed) }))
            }} name="" id="" />
            <label htmlFor='char'>Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App