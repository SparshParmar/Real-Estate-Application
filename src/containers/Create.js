import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CreateListing from '../components/CreateListing';
import ListingForm from '../components/ListingForm';
import Listings from '../components/Listings';
import { connect } from 'react-redux';
import Pagination from '../components/Pagination';
import Login from '../containers/Login'
const Create = ({isAuthenticated, username , token}) => {
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listingsPerPage, setListingsPerPage] = useState(3);
    const [active, setActive] = useState(1);

    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    

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


    if(isAuthenticated){
        return(
            <main className='home'>
                <Helmet>
                    <title>Realest Estate - Create</title>
                    <meta
                        name='description'
                        content='Realest Estate Create Page'
                    />
                </Helmet>
                <section className='home__form'>
                    <CreateListing setListings={setListings} username={username} token={token} />
                </section>
                <section className='home__listings'>
                    <Listings listings={listings} /> 
                </section>
                <section className='home__pagination'>
                    <div className='row'>
                        {
                            listings.length !== 0 ? (
                                <Pagination
                                    itemsPerPage={listingsPerPage}
                                    count={listings.length}
                                    visitPage={visitPage}
                                    previous={previous_number}
                                    next={next_number}
                                    active={active}
                                    setActive={setActive}
                                />
                            ) : null
                        }
                    </div>
                </section>
            </main>
        );
    }
    else{
        return(
            <Login/>
        )
    }

    
};



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    token: state.auth.token
});


export default connect(mapStateToProps)(Create);


// agency: props.username,
//         property : {
//             title : 'property title',
//             owner: props.username,
//             photo_main : image_main,
//             address : 'address',
//             city : 'city',
//             zipcode: 'zipcode',
//             bedrooms : '2',
//             bathroooms : '1',
//             home_type : 'House',
//             sqmt: 23,
//             slug: 'property_slug'
//         },
//         sale_type: 'For Sale',
//         price: '$0+',
//         list_date: '2021-01027 00:00:00',
//         open_house: 'false',
//         is_published: 'false',