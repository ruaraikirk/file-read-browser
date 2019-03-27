import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const Unzip = require('isomorphic-unzip');

const FNAME = 'meta.json';
const appValue = 'com.bohemiancoding.sketch3';

function validateFile(sketchMetaJson) {
    // Validation - overkill? correct point to carry out this sort of check?
    const [a] = Object.values(sketchMetaJson.pagesAndArtboards).filter(f => f.name === 'Symbols');
    console.log("Symbols Page: ", a, sketchMetaJson.app);
    console.log("App: ", sketchMetaJson.app);
    if (Object.values(a).indexOf('Symbols') > -1 && `${sketchMetaJson.app}` === appValue) { 
        console.log('This file is valid.'); 
        document.getElementById('submit').disabled = false;
    } else { // Need to test with some invalid or 'unacceptable' .sketch files
        console.log('Sorry, this file appears to be invalid, please select a valid file.');
        document.getElementById('submit').disabled = true;
    }
}

function readBuffer (err, buffers) {
    if (err) throw err;
    const res = buffers[FNAME].toString();
    let json;
    try { 
        json = JSON.parse(res);
        console.log("Sketch file meta.json: ", json);
        validateFile(json);
    }
    catch (e) {}
};

function handleFileChosen (file) {
    const unzip = new Unzip(file, {type: 'application/zip'});
    unzip.getBuffer([FNAME], {}, readBuffer);
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
            // onSubmit= call some function to render file name/thumbnail image in CMS and upload file to GitHub?
        />
    </div>;
};

ReactDOM.render(<ImportFromFileBodyComponent />, document.getElementById('root'));
