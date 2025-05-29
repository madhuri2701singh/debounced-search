
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results , setResults] = useState([]);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedQuery(query);
    },500);
    return () => clearTimeout(timer);
  },[query]);

useEffect (()=>{
  if(debouncedQuery.trim() === ''){
    setResults([])
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`)
  .then(res =>res.json()).then(data =>{
    setResults(data.products)
  })
  .catch(err =>{
    console.log(err);
  });
  },[debouncedQuery] )

  return (
    <div className='search-container'>
      <h1>Search</h1>
      <input type='text' placeholder='search products...' value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className='results'>
        {results.length === 0 && debouncedQuery && (<p>No products found for "{debouncedQuery}" </p>)}
        {results.map(product =>(
          <div key={product.id} className='card'
          >
            <img src={product.thumbnail} alt={product.title}/>
            <div>
              <h3>{product.title}</h3>
              <p> ₹ {product.price}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )

}
export default App
