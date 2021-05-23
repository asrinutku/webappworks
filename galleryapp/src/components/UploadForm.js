import React,{useState} from 'react';
import ProgressBar from './ProgressBar';

export default function UploadForm() {

    const [file,setFile] = useState(null);
    const [error,setError] = useState(null);
    const types = ['image/png','image/jpeg'];



    const changeHandler = (e) =>{

        let selected = e.target.files[0];
        
        if(selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
        }
        else{
            setFile(null);
            setError('lutfen .png ya da .jpeg uzantılı dosya yükleyin');
        }
    }

    return (
        <form>
            <input type="file" onChange={changeHandler}/>
            <div className="output">
                {file && <div>file.name</div>}
                {error && <div className="error">{error}</div>}
                {file && <ProgressBar file={file} setFile={setFile}/>}
            </div>
            
        </form>
    )
}
