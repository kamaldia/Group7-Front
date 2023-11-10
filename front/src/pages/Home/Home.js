import React from "react";
import "./Home.css";
// import { useEffect, useState } from "react";
import dashboardIcon from "../../assets/icons/adminDashboardIcon.svg";
import Header from "../../components/Header/Header";
import Navbar from '../../components/Navbar/Navbar';
import Carousel from '../../components/Carousel/Carousel';
import CarouselBottom from '../../components/carouselBottom/CarouselBottom';
import Products from '../../components/Products/Products';
import Featured from '../../components/Featured/Featured';
import Blogs from '../../components/CarouselComponent/CarouselComponent'
import Bottom from '../../components/carouselBottom/Bottom/Bottom'
const Home = () => {


  return (
<div className="homepage">
<Header/>
<Navbar/>
<Carousel/>
<CarouselBottom/>
<Products/>
<Featured/>
<Blogs/>
<Bottom/>
</div>
  );
};

export default Home;
