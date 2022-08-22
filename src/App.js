import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs";
function App() {
   const [image,setImage] = useState(null)
   const [modelUrl,setModelUrl] = useState("")



  const processImage = (imageData)=>{
    let imageTensor = tf.browser.fromPixels(imageData);
    const offset = tf.scalar(255.0)
    const normalized = tf.scalar(1.0).sub(imageTensor.div(offset))
    const batched = normalized.expandDims(0);
    return batched
  }
  const predict = async()=>{
    if(!image){
      alert("Please Add Image")
    }
    const MODEL_HTTP_URL = "model.json";
    try {
      const model = await loadLayersModel(
        window.location.href + MODEL_HTTP_URL
      );
      console.log("Model loaded from HTTP.");
      console.log(model, "mmm");
        const imaged = document.getElementById("image");
        console.log("converting image ...");
        const imageTensor = processImage(imaged);
        console.log("loading model ...");
           let result = model.predict(imageTensor);
           console.log(result, "result");
    } catch (error) {
      console.error(error, "rrrr");
    }
   
 

  }
  return (
    <div className="App">
      <input
        type={"file"}
        alt={"hh"}
        onChange={(e) => {
          const [file] = e.target.files;
          setImage(URL.createObjectURL(file));
        }}
      />
      {/* <input
        type={"file"}
        alt={"ggjgjg"}
        onChange={(e) => {
          const [file] = e.target.files;
          console.log(URL.createObjectURL(file));
        }}
      /> */}
      <img
        id="image"
        alt="kk"
        height={"200"}
        src={
          image
        }
        width={"300"}
      />

      <button onClick={predict}>Predict</button>
    </div>
  );
}

export default App;
