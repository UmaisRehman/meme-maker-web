// users/page.jsx

import React from 'react';

const Users = async () => {
  // Static rendering with revalidation every 50 seconds
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: {
      revalidate: 50,  // Revalidate data every 50 seconds
    },
  });

  const data = await response.json();

  return (
    <>
      <h1>{new Date().toLocaleTimeString()}</h1>
      <div>Users</div>
      {data.map((item) => (
        <h1 key={item.id}>{item.name}</h1>
      ))}
    </>
  );
};

export default Users;
