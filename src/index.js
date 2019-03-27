import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const Unzip = require('isomorphic-unzip');


const FNAME = 'meta.json';


function readBuffer (err, buffers) {
    if (err) throw err;
    const res = buffers[FNAME].toString();
    let json;
    try { json = JSON.parse(res); }
    catch (e) {}
    console.log(json);
}

function handleFileChosen (file) {
    const unzip = new Unzip(file, {type: 'application/zip'});
    unzip.getBuffer([FNAME], {}, readBuffer);
};



function ImportFromFileBodyComponent () {
    return <div className='upload-expense'>
        <input type='file'
            id='file'
            className='input-file'
            accept='.sketch'
            onChange={e => handleFileChosen(e.target.files[0])}
        />
    </div>;
};

ReactDOM.render(<ImportFromFileBodyComponent />, document.getElementById('root'));
