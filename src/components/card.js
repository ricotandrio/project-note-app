import React, { useEffect, useState } from 'react'
import { showFormattedDate } from '../utils/data';

export default function Card(props) {
  const [currProps, setCurrProps] = useState([]);

  useEffect(() => {
    setCurrProps(props.dataObject);
    console.log(props.find);
  }, []);

  if(props.find == 'active' && currProps.archived == false){
    return (
      <>
        <div className='border w-1/4 p-3 flex flex-col text-left m-3'>
          <div>
            <h1 className='font-bold text-xl mb-2'>{ currProps.title }</h1>
            <h3 className='opacity-60 text-sm font-lg'>{ showFormattedDate(currProps.createdAt) }</h3>
          </div>
          <div className='mt-3 h-1/2'>
            <p>{ currProps.body }</p>
          </div>
          <div className='mt-5 border flex flex-row items-center'>
            <button className='p-3 border rounded-full w-32 m-2 bg-red-400'
              onClick={() => {

              }}
            >
              HAPUS
            </button>
            <button className='p-3 border rounded-full w-32 m-2 bg-yellow-300'
              onClick={() => {

              }}
            >
              ARSIPKAN
            </button>
          </div>
        </div>
      </>
    )
  } else if(props.find == 'archieved' && currProps.archived == true){
    return (
      <>
        <div className='border w-1/4 p-3 flex flex-col text-left m-3'>
          <div>
            <h1 className='font-bold text-xl mb-2'>{ currProps.title }</h1>
            <h3 className='opacity-60 text-sm font-lg'>{ showFormattedDate(currProps.createdAt) }</h3>
          </div>
          <div className='mt-3 h-1/2'>
            <p>{ currProps.body }</p>
          </div>
          <div className='mt-5 border flex flex-row items-center'>
            <button className='p-3 border rounded-full w-32 m-2 bg-red-400'
              onClick={() => {

              }}
            >
              HAPUS
            </button>
            <button className='p-3 border rounded-full w-32 m-2 bg-yellow-300'
              onClick={() => {

              }}
            >
              PINDAHKAN
            </button>
          </div>
        </div>
      </>
    )
  }


}

