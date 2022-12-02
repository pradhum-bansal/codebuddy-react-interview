import React, { useState } from 'react';
import '../styles/index.css';

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const fetchPosts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {})
      // Converting to JSON
      .then(response => response.json())
      .then(json => {
        setPostData(json?.data?.posts);
      });
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="container">
      <div className="d-flex py-5">
        <h1 className="m-auto">POSTS</h1>
      </div>
      <div className="row d-flex flex-wrap">
        {postData && postData.length > 0 ? (
          postData.map(item => (
            <div
              className="card col-lg-3 col-md-5 col-sm-10 my-3 mx-lg-5 mx-md-3 shadow"
              key={item.id}
            >
              <div className="card-header px-0">
                <img src={item.image} alt={item.firstName} className="w-100" />
              </div>
              <div className="card-body">
                <p>{item.writeup}</p>
              </div>
              <div className="card-footer">
                <p className="m-auto text-center">
                  <span>{item.firstName} &nbsp;</span>
                  <span>{item.lastName}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Posts;
