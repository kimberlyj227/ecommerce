import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { getCategories, list  } from "./apiCore";
import ProductCard from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then(res => {
      if(res.error) {
        console.log(res.error)
      } else {
        setData({...data, categories: res})
      }
    });
  };

  const searchData = () => {
    if(search) {
      list({search: search || undefined, category: category})
        .then(res => {
          if(res.error) {
            console.log(res.error)
          } else {
            setData({...data, results: res, searched: true})
          }
        })
    }
  }

  const searchSubmit = e => {
    e.preventDefault();
    searchData()
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setData({...data, [name]: value, searched: false})
  }

  const searchForm = () => {
    return (
        <form onSubmit={searchSubmit}>
          <span className="input-group-text mb-4">
            
              <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                  <select 
                    className="btn mr-2" 
                    onChange={handleChange}
                    name="category"
                  >
                    <option value={"All"}>Choose a Category...</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}        
                  </select>
                </div>

                <input 
                  type="search"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="search"
                  name="search"
                />
              </div>
              <div 
                className="btn input-group-append"
                style={{ border: "none"}}
              >
                <button className="input-group-text">
                  Search
                </button>
              </div>
            
          </span>
        </form>
    )
  }

  const searchedProducts = ( results = []) => {
    return (
      <Row>
        {results.map((product, i) => (
          <ProductCard 
            product={product}
            key={i}
          />
        ))}
      </Row>
    )
  }

  return (
    <Row>
      <Container>
        {searchForm()}
        
      </Container>

      <Container fluid>
        {searchedProducts(results)}
      </Container>
    </Row>
  )
}

export default Search;