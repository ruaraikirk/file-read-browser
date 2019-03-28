import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const Unzip = require('isomorphic-unzip');

const FNAME = 'meta.json';

function readBuffer (err, buffers) {
    if (err) throw err;
    try { // Unzip file and if check it contains a meta.json file (i.e file is likely valid)
        const res = buffers[FNAME].toString();
        let json;
        json = JSON.parse(res);
        console.log("Sketch file meta.json: ", json);
        document.getElementById('submit').disabled = false; // Enable Submit (upload) button as file is likely valid
    } catch (e) { // File unzips, but does not contain a meta.son file (i.e. file invalid)
        console.error('Debug #2: ', e);
        alert(`Oops! This isn't a valid Sketch file... Please select a valid Sketch file to upload.`);
        document.getElementById('submit').disabled = true;
    }
};

function handleFileChosen (file) {
    try{
        console.log(file);
        const unzip = new Unzip(file, {type: 'application/zip'});
        console.log(typeof unzip);
        console.log(unzip);
        unzip.getBuffer([FNAME], {}, readBuffer); // TODO: deal with 'File format is not recognized.' error
    } catch (e) { /* User opens 'Choose File' dialog, but presses 'Cancel' 
    (i.e. the value of 'e.target.files[0]' changes to 'undefined' and causes error) */
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
