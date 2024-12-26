'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      setMemes(data.data.memes);
    };

    fetchMemes();
  }, []);

  return (
    <div className="home-container">
      <h1 className="header">Welcome to Meme Generator</h1>
      <div className="meme-gallery">
        {memes.map((meme) => (
          <div key={meme.id} className="meme-card">
            <img src={meme.url} alt={meme.name} className="meme-image" />
            <p>{meme.name.length > 15 ? `${meme.name.slice(0, 15)}...` : meme.name}</p>
            <Link
              href={{
                pathname: '/creatememe',
                query: {
                  url: meme.url,
                  id: meme.id,
                },
              }}
            >
              <button className="generate-btn">Generate this Meme</button>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .home-container {
          text-align: center;
          padding: 20px;
        }

        .header {
          font-size: 2rem;
          margin-bottom: 30px;
        }

        .meme-gallery {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .meme-card {
          width: 200px;
          text-align: center;
        }

        .meme-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .generate-btn {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        }

        .generate-btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Page;
