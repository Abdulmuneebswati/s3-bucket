import { Foldit, Cairo } from 'next/font/google';
import Layout from '@/Components/CommonComponents/Layout';
import AWSS3UploadAsh from 'aws-s3-upload-ash';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types'
import {app} from "../Config/firebase"
import { useState } from 'react';
import  S3  from 'aws-sdk/clients/s3';
import axios from 'axios';

const cairo = Cairo({ subsets: ['latin'] ,variabl:"--font-cairo"})

export default function Home() {
  const [file,setFile] = useState("");
  const [productData,setProductData] = useState(null);
  const onChangeFile = (e)=>{
    setFile(e.target.files[0])
  }

 const s3 = new S3({
  accessKeyId:"AKIA2UTSX4MCF7WDOD7G",
  secretAccessKey:"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",
  region:"eu-north-1"
 })
  
  async function handleSendFile(e) {
    e.preventDefault();
    if (!file) return;
    const params = {
        Bucket: 'file-storage-in-nextjs',
        Key: file.name,
        Body: file,
    };
    try {
        const upload = s3.upload(params);
        upload.on('httpUploadProgress', (p) => {
            console.log(p.loaded / p.total);
            progress.set(p.loaded / p.total);
        });
       const uploadedFile = await upload.promise();
       if (uploadedFile) {
            setProductData({...productData,productImage:uploadedFile.Location});
            const addProduct = await axios.post("http://localhost:4000/addProduct",productData);
            console.log(addProduct);
       }
        // console.log(`File uploaded successfully: ${file.name}`);
    } catch (err) {
        console.error(err);
    }
    
};
const hanldeChange = (e)=>{
    setProductData({...productData,[e.target.name]:e.target.value})
    // console.log(productData);
}
return (
    <Layout>
      <div  className={` min-h-screen   ${cairo.className}`}>
        <h1 className='text-center text-[2rem]'>Add Products</h1>
        <div className="bg-red-300 p-[3rem] flex flex-col items-center justify-center gap-y-[4rem]">
        <div className="flex flex-col w-[50%]  gap-y-2">
          <div className="">Product Name:</div>
        <input name='productName' className='bg-transparent outline-none border-b'  type="text" onChange={(e)=>hanldeChange(e)}/> 
       </div>
       <div className="flex w-[50%] flex-col  gap-y-2">
          <div className="">Product Description:</div>
        <input name='productDescription' className='bg-transparent outline-none border-b'  type="text" onChange={(e)=>hanldeChange(e)}/> 
       </div>
       <div className="flex  w-[50%] flex-col gap-y-2">
          <div className="">Product Category:</div>
        <select name='productCategory' className='bg-transparent outline-none border-b' onChange={(e)=>hanldeChange(e)} >
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
        </select>
       </div>
       <div className=" flex justify-center w-[50%]  gap-y-2">
        <input type="file" placeholder='hi' onChange={onChangeFile}/> 
       </div>
        </div>


<div className="flex justify-center mt-5 ">
 <button onClick={handleSendFile} className='border border-black  p-2 hover:bg-slate-500'>Add Product</button>
</div>
      </div>

    </Layout>
  )
}
