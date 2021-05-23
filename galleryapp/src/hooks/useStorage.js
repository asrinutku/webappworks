import {useState,useEffect} from 'react';
import {projectStorage,projectFirestore,timestamp} from '../firebase/config';

const useStorage = (file) =>{

    const [progress,setProgress] = useState(0);
    const [error,setError] = useState(null);
    const [url,setUrl] = useState(null);

     useEffect(()=>{

        const storageRef = projectStorage.ref(file.name);

        const collectionRef = projectFirestore.collection('photos');

        storageRef.put(file).on('state_changed',(snap) =>{

            let per = (snap.bytesTransferred / snap.totalBytes)*100;
            setProgress(per);
        },(err)=>{
            setError(err);
        },async ()=>{
            const url = await storageRef.getDownloadURL();
            setUrl(url);
            const tarih = timestamp();
            collectionRef.add({
                'url':url,
                'tarih':tarih,
                'ad':file.name
            });
        })

     },[file]);

     return {progress,error,url}

}

export default useStorage;
