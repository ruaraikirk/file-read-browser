import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const Unzip = require('isomorphic-unzip');

const FNAME = 'meta.json';

function readBuffer (err, buffers) {
    if (err) throw err;
    try { // Unzip file and if check it contains a meta.json file
        const res = buffers[FNAME].toString(); 
        //console.log(res);
        let json;
        json = JSON.parse(res);
        console.log("Sketch file meta.json: ", json);
        document.getElementById('submit').disabled = false;
    } catch (e) { // File unzips, but does not contain a meta.son file
        console.error('Debug #2: ', e);
        alert(`Oops! This isn't a valid Sketch file...
        Please select a valid Sketch file to upload.`);
        document.getElementById('submit').disabled = true;
    }
};

function handleFileChosen (file) {
    try{
        const unzip = new Unzip(file, {type: 'application/zip'});
        console.log(typeof unzip);
        console.log(unzip);
        unzip.getBuffer([FNAME], {}, readBuffer);
    } catch (e) { // User opens 'Choose File' dialog, but presses 'Cancel' (i.e. e.target.files[0] == undefined)
        console.log('Cancel:', e)
        alert('No file chosen!')
        document.getElementById('submit').disabled = true;
    }

};

function ImportFromFileBodyComponent () {
    return <div>
        <input type='file'
            id='file'
            accept='.sketch'
            onChange={e => handleFileChosen(e.target.files[0])}
        />
        <input 
            type='submit'
            id='submit'
            name='Upload'
            disabled='disabled'
            //onClick= Call some function to render file name/thumbnail image in CMS and upload file to GitHub.
        />
    </div>;
};

ReactDOM.render(<ImportFromFileBodyComponent />, document.getElementById('root'));
