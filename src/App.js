import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Error from './pages/Error.js';
import Create from './pages/Create.js';
import Archive from './pages/Archive.js';
import { getInitialData } from './utils/local-data.js';
import Active from './pages/Active';
import Notes from './pages/Notes';

export default function RedirectRouter() {
  const [initData, setInitData] = useState(getInitialData());
  const [query, setQuery] = useState('');

  return (
    <>
      <Routes>
        <Route path='/' element={<Create _initData={initData} _setInitData={setInitData} />}/>
        <Route path='notes' element={<Notes _query={query} _setQuery={setQuery}/>}>
          <Route path='archive' element={<Archive _initData={initData} _setInitData={setInitData} _query={query}/>}/>
          <Route path='active' element={<Active _initData={initData} _setInitData={setInitData} _query={query}/>}/>
        </Route>
        <Route path='*' element={<Error />}/>
      </Routes>
    </>
  )
}

