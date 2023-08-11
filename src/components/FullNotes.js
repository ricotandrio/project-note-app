import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

import { showFormattedDate } from '../utils/local-data';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faTrash } from '@fortawesome/free-solid-svg-icons';

import '../index.css';

export default function FullNotes({ _initData, _setInitData }) {
  const { id } = useParams();
  console.log(id);

  const [array, setArray] = useState(_initData.filter((data) => data.id === id));

  const navigate = useNavigate();

  useEffect(() => {
    setArray(_initData.filter((data) => data.id === id));
  }, [id]);

  return (
    <>
      <div className='w-full min-h-screen bg-white pb-5'>
        <nav className='w-full'>
          <div className='flex flex-row items-center justify-between w-full pl-10 pr-10 pt-5 pb-5 sm:pl-20 sm:pr-20'>
            <h1 className='font-bold cursor-pointer' onClick={() => navigate('/notes/active')}>noted.</h1>
            <div className='flex flex-row items-center gap-5 border p-2 rounded-full'>
              <div className='border group/button rounded-full ease-in-out duration-300 hover:bg-red p-1 flex items-center justify-center'>
                <button
                  className='w-8 h-8'
                  onClick={() => {
                    _setInitData(_initData.filter((data) => data.id !== id ))
                    navigate('/notes/active');
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} size='lg' className='text-black ease-in-out duration-300 group-hover/button:text-white'/>
                </button>
              </div>
              <div className='border group/button rounded-full ease-in-out duration-300 hover:bg-purple p-1 flex items-center justify-center'>
                <button
                  className='w-8 h-8'
                  onClick={() => {
                    _setInitData(_initData.map((data) => {
                      if(data.id === id){
                        return { ...data, archived: !data.archived };
                      } else {
                        return data;
                      }
                    }))
                    navigate('/notes/archive');
                  }}
                >
                  <FontAwesomeIcon icon={faArchive} size='lg' className='text-black ease-in-out duration-300 group-hover/button:text-white'/>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {
          array.length !== 0 ? (
            <main className='p-4 w-full mt-5'>
              <section className='p-3 font-bold'>
                <h1 className='font-bold text-3xl'>{array[0].title}</h1>
                <h3 className='text-md mt-5'>{showFormattedDate(array[0].createdAt)}</h3>
              </section>
              <section className='p-3 mt-3'>
                <p className='text-lg'>{parser(array[0].body)}</p>
              </section>
            </main>
          ) : (
            <main className='p-4 w-full mt-5 flex items-center justify-center'>
              <h1 className='font-bold text-3xl'>NOT FOUND ID: {id}</h1>
            </main>

          )
        }

      </div>
    </>
  );
}

FullNotes.propTypes = {
  _initData: PropTypes.array.isRequired,
  _setInitData: PropTypes.func.isRequired
}
