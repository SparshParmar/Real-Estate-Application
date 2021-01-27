import React from 'react';
import Card from './Card';

const listings = ({ listings }) => {
    const getListings = () => {
        let listingsOnPage = [];
        let result = [];
        console.log("listings")

        console.log(listings)
        listings.map(listing => {
            return listingsOnPage.push(
                <Card
                    title={listing.title}
                    address={listing["property"].address}
                    city={listing["property"].city}
                    price={listing.price}
                    sale_type={listing.sale_type}
                    home_type={listing["property"].home_type}
                    bedrooms={listing["property"].bedrooms}
                    bathrooms={listing["property"].bathrooms}
                    sqmt={listing["property"].sqmt}
                    photo_main={"http://localhost:8000"+listing["property"].photo_main}
                    slug={listing.slug}
                    listing_slug={listing.slug}
                />
            );
        })

        for (let i = 0; i < listings.length; i += 3) {
            result.push(
                <div className='row' key='i'>
                    <div className='col-1-of-3'>
                        {listingsOnPage[i]}
                    </div>
                    <div className='col-1-of-3'>
                    {listingsOnPage[i+1] ? listingsOnPage[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                    {listingsOnPage[i+2] ? listingsOnPage[i+2] : null}
                    </div>
                </div>
            );
        }

        return result;
    };

    return (
        <div>
            {getListings()}
        </div>
    );
}

export default listings;
