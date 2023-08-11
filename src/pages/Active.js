import React from 'react';
import PropTypes from 'prop-types';

import Card from '../components/Card.js';

import '../index.css';

export default function Active({ _initData, _setInitData, _query }) {

  return (
    <>
      <section className='p-5 flex flex-row flex-wrap m-3 justify-center'>
        <Card dataObject={ _initData } viewType="active" setFunc={ _setInitData } filter={ _query.get('search') }/>
      </section>
    </>
  );
}

Active.propTypes = {
  _initData: PropTypes.array.isRequired,
  _setInitData: PropTypes.func.isRequired,
  _query: PropTypes.object.isRequired
}

