import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

import { showFormattedDate } from '../utils/local-data.js';

import '../index.css';
import { useNavigate } from 'react-router-dom';

export default function Card({dataObject, viewType, setFunc, filter}) {
  const renderedElement = [];

  const archivedHandler = (_id) => {
    setFunc(dataObject.map(currProps => {
      if(currProps.id === _id){
        return { ...currProps, archived: !currProps.archived };
      }
      return currProps;
    }));
  }

  const deleteHandler = (_id) => {
    const removeData = dataObject.filter((curr)=> curr.id !== _id);
    setFunc(removeData);
  }

  console.log(filter);
  const navigate = useNavigate();

  dataObject.filter((curr) => {
      if(filter){
        return curr.title.toLowerCase().includes(filter.toLowerCase())
      } else {
        return curr;
      }
    })
    .map((currProps) => {
    if((viewType === 'active' && currProps.archived === false) || (viewType === 'archived' && currProps.archived === true)){
      renderedElement.push (
        <section
          key={ currProps.id }
          className='w-5/6 sm:w-1/4 p-8 sm:p-3 bg-pure-white flex flex-col rounded-2xl text-left m-4 shadow-md ease-in-out duration-300 hover:shadow-xl'
        >
          <div>
            <h1 className='font-bold text-xl mb-2'>{ currProps.title }</h1>
            <h3 className='opacity-60 text-sm font-lg'>{ showFormattedDate(currProps.createdAt) }</h3>
          </div>
          <div className='mt-3 h-56'>
            <p>{ parser(currProps.body) }</p>
          </div>
          <div className='mt-5 flex flex-row items-center'>
            <button className='text-xs p-3 shadow-md rounded-full w-full m-2 font-bold bg-purple hover:opacity-80 ease-in-out duration-300'
              onClick={() => {
                navigate(`${currProps.id}`);
              }}
            >
              VIEW
            </button>
          </div>
        </section>
      )
    }
  })
  if(renderedElement.length === 0){
    return (
      <div>
        <h2 className='text-2xl'>notes folder is empty</h2>
      </div>
    )
  }
  return renderedElement;
}

Card.propTypes = {
  dataObject: PropTypes.array.isRequired,
  viewType: PropTypes.string.isRequired,
  setFunc: PropTypes.func.isRequired,
}
