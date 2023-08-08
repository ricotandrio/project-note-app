import React, { useEffect, useState } from 'react';
import './index.css';
import { getInitialData } from './utils/index.js'
import Card from './components/card.js';
import Refresh from './assets/material-symbols_refresh.png'

export default function App() {
  const [initData, setInitData] = useState(getInitialData())
  const [currId, setCurrId] = useState(initData.length);
  const [query, setQuery] = useState('');
  const [bodyLen, setBodyLen] = useState('');

  useEffect(() => {
    let tag = document.getElementById('_num_ofWord');

    if(bodyLen.length <= 50){
      tag.innerHTML = `Jumlah Kata: ${bodyLen.length} / 50`;
      tag.style.color = 'black';
    } else {
      tag.innerHTML = `Jumlah Kata: ${bodyLen.length} / 50 (WARNING)`;
      tag.style.color = 'red';
    }
  }, [bodyLen]);

  return (
    <>
      <div className='w-full h-screen'>
        <nav className='w-full border flex items-center justify-between pl-10 pr-10 pt-5 pb-5 shadow-md'>
          <div>
            <h1 className='text-2xl font-bold'>Aplikasi Catatan</h1>
          </div>
          <div className='w-1/2 p-3 rounded-md bg-gray-100'>
            <input type="text"
              placeholder='Telusuri'
              className='outline-none pl-5 pr-5 bg-transparent placeholder-gray-500'
              name='search'
              id='_search'
              onChange={() => setQuery(document.getElementById("_search").value)}/>
          </div>
          <div className='border rounded-full ease-in-out duration-300 border-transparent hover:bg-gray-200 p-2 flex items-center justify-center'>
            <button className='w-8 h-8' onClick={() => { window.location.reload() }}>
              <img src={ Refresh } alt="refresh icon" className='w-full h-full rounded-full'/>
            </button>
          </div>
        </nav>

        <div className='mb-10 p-3 mt-10 w-full'>
          <form action=""
            className='flex flex-col items-center gap-5'
            onSubmit={(e) => {
              e.preventDefault();

              let temporaryObj = {
                'id': currId + 1,
                'title': document.getElementById("_title").value,
                'body': document.getElementById("_body").value,
                'archived': false,
                'createdAt': new Date()
              };

              if(temporaryObj.title == '' || temporaryObj.title == ' ' || temporaryObj.body == '' || temporaryObj.body == ' '){
                document.getElementById("_warning1").innerHTML = 'WARNING: SETIAP KONTEN JUDUL / CATATAN HARUS TERISI'
              } else if(bodyLen.length >= 50){
                document.getElementById("_warning2").innerHTML = 'WARNING: CATATAN TIDAK BISA LEBIH DARI 50 KARAKTER'
              } else {
                setCurrId(currId + 1);
                setInitData((initData) => [...initData, temporaryObj]);

                document.getElementById("_title").value = '';
                document.getElementById("_body").value = '';
                document.getElementById('_body').style.display = 'none';
              }
            }}
          >
            <p className='text-accent_red' id='_warning1'> </p>
            <p className='text-accent_red' id='_warning2'> </p>
            <input type="text"
              placeholder='Judul'
              name='title'
              id='_title'
              className='border p-3 w-1/3 rounded-md drop-shadow-md focus:outline-none'
              onFocus={() => {
                document.getElementById('_body').style.display = 'flex'
                document.getElementById('_num_ofWord').style.display = 'flex'

              }}
            />

            <textarea name="body"
              id="_body"
              className='resize-none w-1/3 h-28 p-3 border drop-shadow-md rounded-md focus:outline-none'
              style={{ display: 'none', }}
              placeholder='Catatan'
              onChange={() => {
                let tag = document.getElementById('_body');
                setBodyLen(tag.value);
              }}
            />
            <div className='w-1/3 pl-2' id='_num_ofWord' style={{ display: 'none', }}>
              <h2>Jumlah kata: </h2>
            </div>

            <button className='w-1/3 p-3 ease-in bg-primary duration-200 rounded-md text-gray-700 hover:scale-95 hover:bg-accent' type='submit'>
              BUAT
            </button>
          </form>
        </div>

        <div>
          <div className='w-full p-4 m-2 ml-8'>
            <h1 className='text-2xl font-medium'>Active Notes</h1>
          </div>
          <div className='p-5 flex flex-row flex-wrap m-3 justify-center'>
            <Card dataObject={ initData } viewType="active" setFunc={ setInitData } filter={ query }/>
          </div>
        </div>

        <div>
          <div className='w-full p-4 m-2 ml-8'>
            <h1 className='text-2xl font-medium'>Arsip</h1>
          </div>
          <div className='p-5 flex flex-row flex-wrap m-3 justify-center'>
            <Card dataObject={ initData } viewType="archived" setFunc={ setInitData } filter={ query }/>
          </div>
        </div>
      </div>
    </>
  );
}

