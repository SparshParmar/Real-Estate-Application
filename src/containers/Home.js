import React, { useState , useEffect} from 'react';
import { Fragment } from 'react';
import axios from 'axios';

import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import userImage from '../assets/images/userImage.png';
import { Helmet } from 'react-helmet';
import Card from '../components/Card'


const Home = ({isAuthenticated, username}) => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const [listingsPerPage, setListingsPerPage] = useState(10);
    // const [active, setActive] = useState(1);
    // const [count, setCount] = useState(0);
    // const [previous, setPrevious] = useState('');
    // const [next, setNext] = useState('');
    // const [flag, setFlag] = useState(0);
    // const indexOfLastListing = currentPage * listingsPerPage;
    // const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const [listings_, setListings] = useState([]);

    // const visitPage = (page) => {
    //     setCurrentPage(page);
    //     setActive(page);
    // };
    var f_ag = 0;

    // const previous_number = () => {
    //     if (currentPage !== 1) {
    //         setCurrentPage(currentPage-1);
    //         setActive(currentPage-1);
    //     }
    // };

    // const next_number = () => {
    //     if (currentPage !== Math.ceil(listings_.length/3)) {
    //         setCurrentPage(currentPage+1);
    //         setActive(currentPage+1);
    //     }
    // };

     

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/listings/`);
                
                setListings(res.data.results);
                console.log("rendered");
                // console.log(listings_.agency);
            
            }
            catch (err) {

            }
        }

        fetchData();
    }, []);
    


    // axios.get(`http://localhost:8000/api/listings/`).
    // then((res)=>{
    //      listings_ = (res.data.results);
        
    // }).catch((err)=>{
    //     console.log(err);
    // })
                
            

        // fetchData();

    console.log(listings_);
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
        <p>Your Listings</p>

          {
                
          
              isAuthenticated? (

              listings_.map(e=> e.agency===username ?  
                <div key={e}>
                <Card className="card___classname"
                title={e.title}   
                address={e["property"].address}
                city={e["property"].city}
                price={e.price}
                sale_type={e.sale_type}
                home_type={e["property"].home_type}
                bedrooms={e["property"].bedrooms}
                bathrooms={e["property"].bathrooms}
                sqmt={e["property"].sqmt}
                photo_main={e["property"].photo_main}
                slug={e["property"].slug}
                listing_slug={e.slug}/>
                {f_ag = '.'}
                 </div>  :
                 <p key={e.slug}></p>))
              :
              (<p className="home__bottom">Please login to continue</p>)
          }
           <p>
              {f_ag === 0 && isAuthenticated ? "No listings found" : ""}
          </p>
        </div>

         
        <div className="section_two">
          <h3>Dashboard</h3>          
        {
            (isAuthenticated)? (
                <div>
                <hr></hr>
                <br></br>
                <img src={userImage} className="navbar__user_image" alt="User"/>
                <h6>Logged in</h6>
                <br></br>
                <hr></hr>
                <p>Username: {username}</p>
                </div>
            )
            :
            (
            <div className="home__bottom__links">
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
    username: state.auth.username,
    
});


export default connect(mapStateToProps)(Home);