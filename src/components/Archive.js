import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './Card.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRepeat } from '@fortawesome/free-solid-svg-icons';

import '../index.css';

export default function Archive({ _initData, _setInitData, _query, _setQuery }) {
  // init data, id generator, and search query
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  return (
    <>
      <div className='w-full h-screen'>
        <nav className='w-full border flex items-center justify-between pl-10 pr-10 pt-5 pb-5 shadow-md'>
          <div className='flex flex-row items-center w-1/4'>
            <h1 className='text-2xl font-bold'>Archive Notes</h1>
            <div className='border rounded-full ease-in-out duration-300 border-transparent hover:bg-gray-200 p-2 ml-3 mt-1 flex items-center justify-center'>
              <button className='w-8 h-8' onClick={() => { navigate('/')}} >
                <FontAwesomeIcon icon={faRepeat} size='lg'/>
              </button>
            </div>
          </div>
          <div className='w-1/2 p-3 rounded-md bg-gray-100'>
            <input
              type="text"
              placeholder='Telusuri'
              className='outline-none pl-5 pr-5 bg-transparent placeholder-gray-500'
              name='search'
              value={_query}
              onChange={(e) => _setQuery(e.target.value)}
            />
          </div>
          <div className='border rounded-full ease-in-out duration-300 border-transparent hover:bg-gray-200 p-2 flex items-center justify-center'>
            <button className='w-8 h-8' onClick={() => { navigate('/create')}} >
              <FontAwesomeIcon icon={faPlus} size='2x'/>
            </button>
          </div>
        </nav>

        <div>
          <div className='p-5 flex flex-row flex-wrap m-3 justify-center'>
            <Card dataObject={ _initData } viewType="archived" setFunc={ _setInitData } filter={ _query }/>
          </div>
        </div>
      </div>
    </>
  );
}

