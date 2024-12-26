"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const MemeCreator = () => {
  const searchParams = useSearchParams();
  const [generatedImage, setGeneratedImage] = useState('');
  const topText = useRef();
  const bottomText = useRef();

  const memeUrl = searchParams.get('url');
  const templateId = searchParams.get('id');

  useEffect(() => {
    if (!memeUrl || !templateId) {
      console.error("Missing URL or Template ID");
    }
  }, [memeUrl, templateId]);

  const handleMemeGeneration = async (event) => {
    event.preventDefault();

    const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${templateId}&username=umais-rehman&password=.dpwagmt&text0=${topText.current?.value}&text1=${bottomText.current?.value}`, {
      method: 'POST',
    });

    const data = await response.json();
    if (data.success) {
      setGeneratedImage(data.data.url);
    } else {
      console.error('Error generating meme:', data.error_message);
      alert('Failed to create meme. Please try again.');
    }
  };

  return (
    <>
      <div className="container">
        <h1>Create Your Meme</h1>
        {memeUrl && <img className="meme-image" src={memeUrl} alt="Meme Template" />}
        
        <form onSubmit={handleMemeGeneration} className="form-container">
          <input type="text" placeholder="Top Text" ref={topText} className="input-field"/>
          <input type="text" placeholder="Bottom Text" ref={bottomText} className="input-field"/>
          <button type="submit" className="submit-btn">Generate Meme</button>
        </form>

        {generatedImage && <img src={generatedImage} alt="Generated Meme" className="generated-meme"/>}
      </div>

      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
        }

        .meme-image {
          max-width: 100%;
          max-height: 400px;
          margin: 20px auto;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-top: 20px;
        }

        .input-field {
          padding: 10px;
          font-size: 16px;
          width: 80%;
          max-width: 400px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .submit-btn {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        .generated-meme {
          margin-top: 20px;
          max-width: 100%;
          max-height: 400px;
        }
      `}</style>
    </>
  );
};

export default MemeCreator;
