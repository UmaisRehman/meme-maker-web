"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = async () => {
  const data = await fetch('https://api.imgflip.com/get_memes');
  const response = await data.json();

  return (
    <>
      <h1 className="title">Meme Maker</h1>
      <div className="meme-gallery">
        {response.data.memes.map((item) => {
          return (
            <div key={item.id} className="meme-card">
              <Image
                src={item.url}
                width={200}
                height={200}
                alt={item.name}
              />
              <p>{item.name.slice(0, 10)}...</p>
              <Link
                href={{
                  pathname: 'creatememe',
                  query: {
                    url: item.url,
                    id: item.id,
                  },
                }}
              >
                <button className="generate-btn">Generate this meme</button>
              </Link>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .meme-gallery {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .meme-card {
          width: 200px;
          text-align: center;
          background-color: #fff;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
        }

        .meme-card:hover {
          transform: scale(1.05);
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
          transition: background-color 0.3s ease;
        }

        .generate-btn:hover {
          background-color: #45a049;
        }

        .meme-card img {
          width: 100%;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};

export default Home;
