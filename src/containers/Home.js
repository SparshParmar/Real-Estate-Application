import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import userImage from '../assets/images/download.png';
import { Helmet } from 'react-helmet';



const Home = ({isAuthenticated, username}) => {
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
          <h3>Dashboard</h3>          
        {
            (isAuthenticated)? (
                <div>
                <hr></hr>
                <br></br>
                <img src={userImage} class="navbar__user_image" alt="User"/>
                <h6>Logged in</h6>
                <br></br>
                <hr></hr>
                <p>Username: {username}</p>
                </div>
            )
            :
            (
            <div class="home__bottom__links">
            <hr></hr>
            <Link className='navbar__top__auth__link' to='/login'>Login</Link>
            <Link className='navbar__top__auth__link' to='/signup'>Sign Up</Link>
            </div>
            )
        }
          
        </div>
        </div>
      
        </main>
    );
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username
});


export default connect(mapStateToProps)(Home);