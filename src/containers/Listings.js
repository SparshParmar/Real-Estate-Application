import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Card from '../components/Card';
import Pagination from '../components/Pagination';


const Listings = () => {
    const [listings, setListings] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(`http://localhost:8000/api/listings/?page=1`)

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/listings/?page=1`);
                console.log('the res' + res)
                setListings(res.data.results);
                setCount(res.data.count);
                setPrevious(res.data.previous);
                setNext(res.data.next);
            }
            catch (err) {

            }
        }

        fetchData();
    }, []);

    const displayListings = () => {
        let display = [];
        let result = [];

        listings.map(listing => {
            return display.push(
              
                <Card
                    title={listing.title}
                    address={listing["property"].address}
                    city={listing["property"].city}
                    state="N/A"
                    price={listing.price}
                    sale_type={listing.sale_type}
                    home_type={listing["property"].home_type}
                    bedrooms={listing["property"].bedrooms}
                    bathrooms={listing["property"].bathrooms}
                    sqft={listing["property"].sqmt}
                    photo_main={listing["property"].photo_main}
                    slug={listing["property"].slug}
                    listing_slug={listing.slug}
                />
            
            );
        });

        for (let i = 0; i < listings.length; i += 3) {
            result.push(
                <div key={i} className='row'>
                    <div className='col-1-of-3'>
                        {display[i]}
                    </div>
                    <div className='col-1-of-3'>
                        {display[i+1] ? display[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                        {display[i+2] ? display[i+2] : null}
                    </div>
                </div>
            );
        }

        return result;
    };

    const visitPage = (page) => {
        axios.get(`http://localhost:8000/api/listings/?page=${page}`)
        console.log(`http://localhost:8000/api/listings/?page=${page}`)
        .then(res => {
            setListings(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            setActive(page);
        })
        .catch(err => {
            console.log("error caught on visit Page")
        });
    };

    const previous_number = () => {
        axios.get(previous)
        .then(res => {
            setListings(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (previous)
                setActive(active-1);
        })
        .catch(err => {

        });
    };

    const next_number = () => {
        axios.get(next)
        .then(res => {
            setListings(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (next)
                setActive(active+1);
        })
        .catch(err => {

        });
    };

    return (
        <main className='listings'>
            <Helmet>
                <title>Realest Estate - Listings</title>
                <meta
                    name='description'
                    content='Listings page'
                />
            </Helmet>
            <section className='listings__listings'>
                {displayListings()}
            </section>
            <section className='listings__pagination'>
                <div className='row'>
                    <Pagination
                        itemsPerPage={3}
                        count={count}
                        visitPage={visitPage}
                        previous={previous_number}
                        next={next_number}
                        active={active}
                        setActive={setActive}
                    />
                </div>
            </section>
        </main>
    );
};

export default Listings;
