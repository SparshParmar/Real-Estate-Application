import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Helmet } from 'react-helmet';



const Home = (isauth='false') => {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listingsPerPage, setListingsPerPage] = useState(3);
    const [active, setActive] = useState(1);

    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

    const visitPage = (page) => {
        setCurrentPage(page);
        setActive(page);
    };

    const previous_number = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage-1);
            setActive(currentPage-1);
        }
    };

    const next_number = () => {
        if (currentPage !== Math.ceil(listings.length/3)) {
            setCurrentPage(currentPage+1);
            setActive(currentPage+1);
        }
    };

    return (
        <main className='home'>
            <Helmet>
                <title>Realest Estate - Home</title>
                <meta
                    name='description'
                    content='Realest Estate Home Page'
                />
            </Helmet>
        
        <div className='grid_container'>
        <div className="section_one">
          "hey here are the listings..."
        </div>

        <div className="section_two">
          <h2>User Profile</h2>          
        {
            (!isauth)? (
                <div>yes, authenticated</div>
            )
            :
            (
                <div>
            <Fragment>
            <Link className='navbar__top__auth__link' to='/login'>Login</Link>
            Or
            <Link className='navbar__top__auth__link' to='/signup'>Sign Up</Link>
             </Fragment>
             </div>
            )
        }
          
        </div>
        </div>
      
        </main>
    );
};

export default Home;
