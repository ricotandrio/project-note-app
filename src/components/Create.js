import React, { useState } from 'react';

import { getInitialData } from '../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';

import '../index.css';
import { useNavigate } from 'react-router-dom';

export default function Create({ _initData, _setInitData }) {

  // init data, id generator, and search query
  const [currId, setCurrId] = useState(_initData.length);

  // form state
  const [bodyValue, setBodyLen] = useState('');
  const [title, setTitle] = useState('');

  // html tag state
  const [warning1, setWarning1] = useState('');
  const [warning2, setWarning2] = useState('');
  const [bodyVisible, setBodyVisible] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <nav className='w-full border flex items-center justify-between pl-10 pr-10 pt-5 pb-5 shadow-md'>
        <div>
          <h1 className='text-2xl font-bold'>Create Notes</h1>
        </div>
        <div className='border rounded-full ease-in-out duration-300 border-transparent hover:bg-gray-200 p-2 flex items-center justify-center'>
          <button className='w-8 h-8' onClick={() => { navigate('/')}} >
            <FontAwesomeIcon icon={faHome} size='1x'/>
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
              'title': title,
              'body': bodyValue,
              'archived': false,
              'createdAt': (new Date()).toISOString(),
            };

            if(title === '' || bodyValue === ''){
              setWarning1('WARNING: SETIAP KONTEN JUDUL / CATATAN HARUS TERISI');
            } else if(bodyValue.length >= 50){
              setWarning2('WARNING: CATATAN TIDAK BISA LEBIH DARI 50 KARAKTER');
            } else {
              setCurrId(currId + 1);
              _setInitData((initData) => [...initData, temporaryObj]);
              setWarning1('');
              setWarning2('');
              setTitle('')
              setBodyLen('')
              setBodyVisible(false);
            }
          }}
        >
          <p className='text-accent_red' id='_warning1'>{ warning1 }</p>
          <p className='text-accent_red' id='_warning2'>{ warning2 }</p>
          <input type="text"
            placeholder='Judul'
            name='title'
            className='border p-3 w-1/3 rounded-md drop-shadow-md focus:outline-none'
            value={ title }
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => {
              setBodyVisible(true);
            }}
          />

          <textarea name="body"
            className='resize-none w-1/3 h-28 p-3 border drop-shadow-md rounded-md focus:outline-none'
            style={{ display: bodyVisible === true ? 'block' : 'none', }}
            placeholder='Catatan'
            value={ bodyValue }
            onChange={(e) => { setBodyLen(e.target.value); }}
          />
          <div className='w-1/3 pl-2'
            id='_num_ofWord'
            style={{
              display: bodyVisible === true ? 'block' : 'none',
              color: bodyValue.length > 50 ? 'red' : 'black',
            }}
          >
            Jumlah Kata: {bodyValue.length} / 50 {bodyValue.length > 50 && 'WARNING'}
          </div>

          <button className='w-1/3 p-3 ease-in bg-primary duration-200 rounded-md text-gray-700 hover:scale-95 hover:bg-accent' type='submit'>
            BUAT
          </button>
        </form>
      </div>
    </>
  )
}
