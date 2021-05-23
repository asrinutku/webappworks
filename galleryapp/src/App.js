import React,{useState} from 'react'
import ImageGrid from './components/ImageGrid'
import Title from './components/Title'
import UploadForm from './components/UploadForm'
import Modal from './components/Modal'

export default function App() {

    const [selectedImg,setSelectedImg] = useState(null);

    return (
        <div className="App">

            <Title/>
            <UploadForm/>
            <ImageGrid setSelectedImg={setSelectedImg}/>
            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}

        </div>
    )
}
