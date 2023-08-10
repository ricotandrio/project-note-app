import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import './index.css';

export default function App({_query, _setQuery }) {

  const navigate = useNavigate();
  const currPageDesign = ({ isActive }) => {
    return {
      width: window.innerWidth <= 640 ? '20%' : '8.333333%',
      backgroundColor: isActive ? '#c2b4cc' : '#fff',
      margin: '0.75rem',
      padding: '0.75rem',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '50rem',
    }
  }

  return (
    <>
      <div className='w-full min-h-screen bg-white pb-5'>
        <nav className='w-full'>
          <div className='flex flex-row items-center justify-between w-full pl-10 pr-10 pt-5 pb-5 sm:pl-20 sm:pr-20'>
            <h1 className='font-bold'>noted.</h1>
            <div className='border rounded-full ease-in-out duration-300 border-transparent hover:bg-gray-200 p-2 flex items-center justify-center'>
              <button className='w-8 h-8' onClick={() => { navigate('/')}} >
                <FontAwesomeIcon icon={faPlus} size='2xl'/>
              </button>
            </div>
          </div>

          <div className='w-full flex items-center justify-center p-8'>
            <div className='w-5/6 p-3 rounded-full bg-pure-white border'>
              <FontAwesomeIcon icon={faSearch} size='xl' className='pl-2 opacity-50'/>
              <input
                type="text"
                placeholder='Explore'
                className='outline-none pl-5 pr-5 bg-transparent placeholder-gray-500'
                name='search'
                value={_query}
                onChange={(e) => _setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className='font-bold mt-3 pl-8 flex flex-row items-center'>
            <NavLink
              to='active'
              style={currPageDesign}
            >
              Active
            </NavLink>
            <NavLink
              to='archive'
              style={currPageDesign}
            >
              Archive
            </NavLink>
          </div>
        </nav>

        <Outlet />
      </div>
    </>
  );
}

App.propTypes = {
  _query: PropTypes.string.isRequired,
  _setQuery: PropTypes.func.isRequired
}
