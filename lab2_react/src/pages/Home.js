import React, { useState } from 'react';
import NavbarComponent from '../components/home/Navbar';
import Sidebar from '../components/home/Sidebar';
import Slideshow from '../components/home/Slideshow';
import ProductList from '../components/home/ProductList';
import Services from '../components/home/Services';
import Footer from '../components/home/Footer';
const categories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
];

const images = [
  require('../assets/images/bg-yuta.jpg'),
  require('../assets/images/img-hero01.jpg'),
];
const products = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10, image: require('../assets/images/img02.jpg'), category: 'Category 1' },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 20, image: require('../assets/images/img03.jpg'), category: 'Category 2' },
];



function Home({ isLoggedIn, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <NavbarComponent isLoggedIn={isLoggedIn} onLogout={onLogout} onSearch={handleSearch} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Sidebar categories={categories} onSelectCategory={handleSelectCategory} />
          </div>
          <div className="col-md-9">
            <Slideshow images={images} />
            <ProductList products={products} category={selectedCategory} searchQuery={searchQuery} />
            <Services  />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default Home