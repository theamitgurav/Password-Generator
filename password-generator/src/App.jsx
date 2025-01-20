import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters ] = useState(false)
  const [password, setPassword] = useState("")

  const passRef = useRef(null)

  const passGenerator = useCallback(()=>{
    const numberss = "0123456789"
    const characterss = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const specialChars = "!@#$%^&*()_+"

    let charSet = characterss;

    if(numbers) charSet+=numberss;
    if(characters) charSet += specialChars

    let Password = ""

    for(let i=0; i<length; i++){
      const index = Math.floor(Math.random()*charSet.length+1)
      Password += charSet.charAt(index)
    }
    console.log("pass regenerated");
    
    setPassword(Password)
  },[length, numbers, characters, setPassword])

  useEffect(()=>{passGenerator()},[numbers,characters,length,passGenerator])

  const copyPassword=useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])


  return (
    <>
      <div className='w-full max-w-xl mx-auto py-4 px-3 rounded-xl my-96 bg-gray-800 text-orange-600'
      >
        <h2 className='text-center text-3xl my-3'>Password Generator</h2>
        <div className='flex mx-10'>
          <input className='w-full py-3 px-1 outline-none text-black text-xl'
          type="text"
          value={password}
          readOnly 
          ref={passRef}/>
          <button className='bg-orange-600 text-white py-3 px-5 rounded-e-xl text-2xl'
          onClick={copyPassword}
          >copy</button>
        </div>
        <div className='flex flex-wrap justify-center gap-x-4 py-4 '>
          <div className='flex gap-x-2'>
            <input type="range" 
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label htmlFor=""  className='text-xl '>Length: {length} </label>
          </div>
          <div className='flex gap-x-1'>
            <input type="checkbox" 
            defaultValue={numbers}
            onChange={()=>{setNumbers((prev)=> !prev)}}
            className='cursor-pointer outline-none'/>
            <label htmlFor="" className='text-xl' >Numbers</label>
          </div>
          <div className='flex gap-x-1'>
            <input type="checkbox"
            defaultValue={characters}
            onChange={()=>{setCharacters((prev)=> !prev)}}
            className='cursor-pointer outline-none' />
            <label htmlFor="" className='text-xl'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
