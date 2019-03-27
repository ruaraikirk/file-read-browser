import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import ZipLoader from 'zip-loader';

const ImportFromFileBodyComponent = () => {

    const handleFileChosen = (file) => {
        // Prints all files directly to console as objects
        ZipLoader.unzip( file ).then( function ( ZipLoaderInstance ) {
 
            console.log( ZipLoaderInstance.files );
            // Extracts json file and prints to console.
            const json = ZipLoaderInstance.extractAsJSON('meta.json');
            console.log(json)   
          } );
    };

    return <div>
        <input type='file'
               id='file'
               accept='.sketch'
               onChange={e => handleFileChosen(e.target.files[0])}
        />
    </div>;
};

ReactDOM.render(<ImportFromFileBodyComponent />, document.getElementById('root'));
