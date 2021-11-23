import  React, { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState("everything");
  const [isLoading, setISloading] = useState(true);

  const apiKey = "8z8vDObrWXksGjr5uW2hKesJ42ajcjYU";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${apiKey}`
        );
        const articles = await res.json();
        console.log(articles);
        setArticles(articles.response.docs);
        setISloading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
  }, [term]);

  return (
    <div className="homepage">
      <h1 className="homepage__header">Homepage</h1>
      <div className="homepage__search">
        <div>
          <p>Filter by keywords:</p>
          <SearchForm searchText={(text) => setTerm(text)} />
        </div>
      </div>
      {isLoading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <div>
          <h3 className="about">Articles about {term}:</h3>
             <div className="news">
            {articles.map((article) => {
              const {
                abstract,
                headline: { main },
                byline: { original },
                lead_paragraph,
                news_desk,
                section_name,
                web_url,
                _id,
              } = article;
              return (
                <div key={_id}>
                  <div className="article">
                    <h1 className="article__title">{main}</h1>
                    <p className="article__abstract">{abstract}</p>
                    <p className="article__content">{lead_paragraph}</p>
                    <p className="article__auth">Author original article: {original}</p>
                    <span className="article__auth">{news_desk}:</span>
                    <span className="article__auth"> {section_name}</span> <br/>
                    <a href={web_url} target="_blank">Web resourse</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
