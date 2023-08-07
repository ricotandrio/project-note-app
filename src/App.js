import React, { useEffect, useState } from 'react';
import './index.css';
import { getInitialData, showFormattedDate } from './utils/data.js'
import Card from './components/card';

function App() {
  const [initData, setInitData] = useState([])

  useEffect(() => {
    setInitData(getInitialData());
  }, []);

  useEffect(() => {
    console.log(initData);
  }, []);

  return (
    <>
      <div className='w-full h-screen'>
        <nav className='w-full border flex items-center justify-between pl-10 pr-10 pt-5 pb-5'>
          <div className='border'>
            <h1 className='text-2xl font-bold'>Aplikasi Catatan</h1>
          </div>
          <div className='border w-1/2 p-3'>
            <label htmlFor="_search" className='p-3 hover:bg-black hover:text-white'>SEARCH LOGO</label>
            <input type="text" placeholder='telusuri' className='outline-none p-2'/>
          </div>
          <div className='border'>
            <button className='bg-red-200' onClick={() => { window.location.reload() }}>
              SEGARKAN
            </button>
          </div>
        </nav>

        <div className='mb-10 p-3 mt-10 w-full'>
          <form action="" className='flex flex-col items-center gap-5 border'>
            <input type="text" placeholder='judul' name='title'
              className='border p-3 w-1/3'
              onFocus={() => { document.getElementById('textarea_body').style.display = 'flex' }}
              onBlur={() => { document.getElementById('textarea_body').style.display = 'none' }}/>

            <textarea name="body" id="textarea_body"
              className='resize-none w-1/3 h-28 p-3 border'
              style={{ display: 'none', }}
              placeholder='catatan'
            />

            <button className='w-1/3 p-3 border'
              onClick={() => {

              }}
            >
              BUAT
            </button>
          </form>
        </div>

        <div>
          <div className='w-full p-4 m-2 ml-8'>
            <h1 className='text-2xl font-medium'>Active Notes</h1>
          </div>
          <div className='p-5 flex flex-row flex-wrap m-3 justify-center'>
            {
              initData.map((data) => (
                <Card key={ data.id } dataObject={ data } find='active'/>
              ))
            }
          </div>
        </div>

        <div>
          <div className='w-full p-4 m-2 ml-8'>
            <h1 className='text-2xl font-medium'>Arsip</h1>
          </div>
          <div className='p-5 flex flex-row flex-wrap m-3 justify-center'>
            {
              initData.map((data) => (
                <Card key={ data.id } dataObject={ data } find='archieved'/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
