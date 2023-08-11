import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import '../index.css';

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
      <main className='w-full min-h-screen bg-white pb-5'>
        <nav className='w-full'>
          <div className='flex flex-row items-center justify-between w-full pl-10 pr-10 pt-5 pb-5 sm:pl-20 sm:pr-20'>
            <h1 className='font-bold'>noted.</h1>
            <div className='border rounded-full ease-in-out duration-300 border-transparent hover:bg-gray-200 p-2 flex items-center justify-center'>
              <button className='w-8 h-8' onClick={() => { navigate('/notes/active')}} >
                <FontAwesomeIcon icon={faNoteSticky} size='xl'/>
              </button>
            </div>
          </div>
        </nav>

        <section className='mb-10 p-3 mt-10 w-full'>
          <form action=""
            className='flex flex-col items-center gap-5'
            onSubmit={(e) => {
              e.preventDefault();

              let temporaryObj = {
                'id': `notes-${currId + 1}`,
                'title': title,
                'body': bodyValue,
                'archived': false,
                'createdAt': (new Date()).toISOString(),
              };

              if(title === '' || bodyValue === ''){
                setWarning1('WARNING: EVERY CONTENT TITLE / NOTE MUST BE FILLED');
              } else if(bodyValue.length > 100){
                setWarning2('WARNING: NOTES CANNOT EXCEED 100 CHARACTERS');
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
              placeholder='Title'
              name='title'
              className='border p-3 w-5/6 sm:w-3/4 rounded-xl drop-shadow-md focus:outline-none'
              value={ title }
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => {
                setBodyVisible(true);
              }}
            />

            <div
              className='resize-none bg-pure-white w-5/6 sm:w-3/4 h-28 sm:h-52 p-3 border drop-shadow-md rounded-xl focus:outline-none'
              style={{ display: bodyVisible ? 'block' : 'none' }}
              data-placeholder='Description'
              contentEditable='true'
              onInput={(e) => { setBodyLen(e.target.innerHTML) }}
            />

            <div className='w-1/3 pl-2'
              id='_num_ofWord'
              style={{
                display: bodyVisible === true ? 'block' : 'none',
                color: bodyValue.length > 100 ? 'red' : 'black',
              }}
            >
              Word Count: {bodyValue.length} / 100 {bodyValue.length > 100 && 'WARNING'}
            </div>

            <button
              className='w-1/2 p-3 ease-in bg-purple duration-200 rounded-full text-gray-700 hover:scale-95'
              type='submit'
              style={{
                display: bodyVisible === true ? 'block' : 'none',
              }}
            >
              BUAT
            </button>
          </form>
        </section>
      </main>
    </>
  )
}

Create.propTypes = {
  _initData: PropTypes.array.isRequired,
  _setInitData: PropTypes.func.isRequired
}
