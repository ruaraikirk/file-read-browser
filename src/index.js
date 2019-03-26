import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const ImportFromFileBodyComponent = () => {
    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        console.log(content);
        // … do something with the 'content' …
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsBinaryString(file);
    };

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
