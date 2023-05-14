import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  const [activeLink, setActiveLink] = useState('google');

  useEffect(() => {
    fetch('blog_post_example.xml')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=5ba36dd91cba403bae00853df0053185'
      )
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLinkClick = (source) => {
    setActiveLink(source);
  };

  return (
    <div className="App">
      <h1>My Blogs News App</h1>
      <header className="App-header">
        <nav className="navbar">
          <a className={activeLink === 'google' ? 'active' : ''} href="#google-news" onClick={() => handleLinkClick('google')}>Google News</a>
          <a className={activeLink === 'json' ? 'active' : ''} href="#json-news" onClick={() => handleLinkClick('json')}>My XML News</a>
        </nav>
      </header>
  
      <div className="container">
        {activeLink === 'google' && (
          <>
            <h1>Google News</h1>
            <div className="card-container">
              {news.map((article) => (
                <div className="card" key={article.title}>
                  <img
                    className="card-image"
                    src={article.urlToImage}
                    alt={article.title}
                  />
                  <div className="card-content">
                    <h2 className="card-title">{article.title}</h2>
                    <p className="card-date">
                      <em>{article.publishedAt}</em>
                    </p>
                    <p className="card-author">By {article.author}</p>
                    <p className="card-description">{article.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeLink === 'json' && (
          <>
          <h1>My Xml News</h1>
            {Object.keys(blogs).map((key) => (
              
              <div className="card" key={key}>
                <img
                  className="card-image"
                  src={blogs[key].image}
                  alt={blogs[key].title}
                />
                <div className="card-content">
                  <h1 className="card-title">{blogs[key].title}</h1>
                  <p className="card-date">{blogs[key].date}</p>
                  <p className="card-author">{blogs[key].author}</p>
                  <p className="card-summary">{blogs[key].summary}</p>
                  <p className="card-body">{blogs[key].body}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <footer className="footer">
        <p>&copy; 2023 My Blogs News App</p>
      </footer>
      
    </div>
    
  );
}

export default Blog;
