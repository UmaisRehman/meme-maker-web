"use client"

import React, { useState, useRef } from 'react';

const Creatememe = ({ searchParams }) => {
  const [img, setImg] = useState('');
  const text1 = useRef();
  const text2 = useRef();

  const createMeme = async (event) => {
    event.preventDefault();

    const data = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=umais-rehman&password=.dpwagmt&text0=${text1.current?.value}&text1=${text2.current?.value}`, {
      method: 'POST'
    });
    const response = await data.json();
    setImg(response.data.url);
  }

  return (
    <>
      <div className="creatememe-container">
        <h1>Create Meme</h1>
        <div className="meme-display">
          <img className="meme-image" src={searchParams.url} alt="meme-image" />
        </div>

        <form onSubmit={createMeme} className="meme-form">
          <input type="text" placeholder='Enter text 1' ref={text1} />
          <input type="text" placeholder='Enter text 2' ref={text2} />
          <button type='submit' className="generate-btn">Create Meme</button>
        </form>

        {img && <img src={img} alt="final meme" className="generated-meme" />}
      </div>

      <style jsx>{`
        .creatememe-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
        }

        .meme-display {
          margin-bottom: 20px;
        }

        .meme-image {
          width: 300px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .meme-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }

        .meme-form input {
          padding: 10px;
          border: 2px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .generate-btn {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: 2px solid #4caf50;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
          transition: background-color 0.3s, border-color 0.3s;
        }

        .generate-btn:hover {
          background-color: #45a049;
          border-color: #45a049;
        }

        .generated-meme {
          margin-top: 20px;
          max-width: 100%;
          width: 300px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

export default Creatememe;
