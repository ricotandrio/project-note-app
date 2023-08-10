import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import App from './App';
import Error from './components/Error.js';
import Create from './components/Create.js';
import Archive from './components/Archive.js';
import { getInitialData } from './utils/index.js';

export default function RedirectRouter() {
  const [initData, setInitData] = useState(getInitialData());
  const [query, setQuery] = useState('');

  return (
    <>
      <Routes>
        <Route path='/' element={<App _initData={initData} _setInitData={setInitData} _query={query} _setQuery={setQuery}/>}/>
        <Route path='*' element={<Error />}/>
        <Route path='/create' element={<Create _initData={initData} _setInitData={setInitData} />}/>
        <Route path='/archive' element={<Archive _initData={initData} _setInitData={setInitData} _query={query} _setQuery={setQuery}/>}/>
      </Routes>
    </>
  )
}

