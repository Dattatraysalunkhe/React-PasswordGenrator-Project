import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const[length,setlength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false)
  const[charAllowed,setcharAllowed]=useState(false)
  const[password,setPassword]=useState("")

  const passwordRef =useRef(null)
  
  const PasswordGenrator = useCallback(()=>{
           let pass=""
           let str ="ABCDEFGHIJKLMNOPQRSTVWXYXabcdefghijklmnopqrstvwxyz"

           if(numberAllowed) str+= "0123456789"

           if(charAllowed) str+= "!@#$%^&*()_+{}:/,.<>"

           for( let i=1;i<=length;i++)
           {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
           }
           setPassword(pass)
           

           
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard =  useCallback(()=>{
         passwordRef.current?.select();
         window.navigator.clipboard.writeText(password)
  },[password])

  useEffect( () => {
        PasswordGenrator()
  },[length, numberAllowed, charAllowed, PasswordGenrator])

  return (
    <>
      

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-emerald-500 bg-gray-800'>
      <h1 className='text-4xl text-center font-medium text-white my-3'>Password Genrator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4' >
               <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='Password' ref={passwordRef} readOnly/>

               <button className='outline-none bg-orange-600 text-white px-3 py-0.5 shrink-0 hover:bg-purple-800' onClick={copyPasswordToClipboard}>Copy</button>
            </div>
            <div className='flex text-sm gap-x-2'>
                <div className='flex items-center gap-x-1'>
                  <input type='range' min={6} max={20} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}/>
                  <label>Lenght : {length}</label>
                  
                </div>
                <div className='flex items-center gap-x-1' >
                    <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed((prev)=> !prev)}}/>
                    <label htmlFor='numberInput'>Number</label>
                </div>
                <div className='flex items-center gap-x-1' >
                    <input type='checkbox' defaultChecked={charAllowed} id='charactersInput' onChange={()=>{setcharAllowed((prev)=> !prev)}}/>
                    <label htmlFor='charactersInput'>Characters</label>
                </div>
            </div>
      </div>
    </>
  )
}

export default App
