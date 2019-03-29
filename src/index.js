import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ZipLoader from 'zip-loader';

const fileCheck = 'meta.json';

const ImportFromFileBodyComponent = () => {

    const handleFileChosen = (file) => {
        console.log('Debug#1: ', file);
        if (file === undefined) { // If user opens file selection dialog, but hits 'Cancel'
            document.getElementById('submit').disabled = true;
        } else {
            ZipLoader.unzip( file ).then( function ( ZipLoaderInstance ) {
                console.log( ZipLoaderInstance.files );
                try { // Unzip file and if check it contains a meta.json file (i.e file is likely valid)
                    const json = ZipLoaderInstance.extractAsJSON(fileCheck);
                    console.log("Sketch file meta.json: ", json);
                    document.getElementById('submit').disabled = false; // Enable Submit (upload) button as file is likely valid
                } catch (e) { // File unzips, but does not contain a meta.son file (i.e. file invalid)
                    console.log('meta.son is not present: ', e)
                    alert(`Oops! This isn't a valid Sketch file... Please select a valid Sketch file to upload.`);
                    document.getElementById('submit').disabled = true;
                }
              });
        }
    };

    return <div>
        <input 
            type='file'
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
