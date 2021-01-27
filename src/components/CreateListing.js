import React, { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import image_main from '../assets/images/download.png';
const CreateListing = (props) => {
  const [listingData, setListingData] = useState({
    agency: props.username,
    sale_type: 'For Sale',
    price: '$0+',
    list_date: '2021-01027 00:00:00',
    open_house: 'false',
    is_published: 'false',
    photo_main: image_main,
    slug: 'listing slug',
    title: 'the lsiting title',
    description: 'the description',
    bathrooms: 1,
    bedrooms:1
  });

  const [propertyData, setPropertyData] = useState({
    
        _title: 'property title',
        _owner: props.username,
        _photo_1: image_main,
        _address: 'address',
        _city: 'city',
        _zipcode: 123456,
        _bedrooms: 2,
        _bathrooms:1,
        _home_type: 'House',
        _sqmt: 23,
        _slug: 'property_slug',
    
  })

  const {
    agency,
    sale_type,
    title,
    price,   
    open_house,
    bedrooms,
    bathrooms,
    slug,
    is_published,
    list_date,
    photo_main,
    description,
  } = listingData;

  const {_title,
        _address,
        _bathrooms,
        _bedrooms,
        _city,
        _owner,
        _home_type,
        _photo_1,
        _slug,
        _sqmt,
        _zipcode  ,
              } = propertyData

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setListingData({ ...listingData, [e.target.name]: e.target.value });

    const _onchange = (e) =>
    setListingData({ ...propertyData, [e.target.name] : e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    var res = listingData;
    res.propert = propertyData;
    console.log(res);

    // setLoading(true);

    axios
      .post(
        `http://localhost:8000/api/create_property`,
        {_owner,
          _title,
        _address,
        _bathrooms,
        _bedrooms,
        _city,
        _owner,
        _home_type,
        _photo_1,
        _slug,
        _sqmt,
        _zipcode 
        },
        config
      )
      .then((res) => {
        setLoading(false);
        props.setListings(res.data);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setLoading(false);
        console.log('errorcaught');
        window.scrollTo(0, 0);
      });

      axios
      .post(
        `http://localhost:8000/api/create_listing`,
        {
          agency,
          sale_type,
    title,
    price,   
    open_house,
    bedrooms,
    bathrooms,
    slug,
    is_published,
    list_date,
    photo_main,
    description,
        },
        config
      )
      .then((res) => {
        setLoading(false);
        props.setListings(res.data);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setLoading(false);
        console.log('errorcaught');
        window.scrollTo(0, 0);
      });

    // console.log(photo_main, slug, title, description, sale_type, price, bedrooms, bathrooms, open_house, is_published, list_date);

        // console.log(_title,
        //     _address,
        //     _bathrooms,
        //     _bedrooms,
        //     _city,
        //     _owner,
        //     _home_type,
        //     _photo_1,
        //     _slug,
        //     _sqmt,
        //     _zipcode);

        console.log(_title,
          _address,
          _bathrooms,
          _bedrooms,
          _city,
          _owner,
          _home_type,
          _photo_1,
          _slug,
          _sqmt,
          _zipcode );

          console.log(sale_type,
            title,
            price,   
            open_house,
            bedrooms,
            bathrooms,
            slug,
            is_published,
            list_date,
            photo_main,
            description,);
  };

  const handleFile = (e) =>
    setListingData({
      ...listingData,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });

  return (
    <form className="listingform" onSubmit={(e) => onSubmit(e)}>
      ]
      <div className="row">
        <h1>Listing</h1>

        <br></br>
        <div className="col-1-of-6">
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="sale_type">
              Sale or Rent
            </label>
            <select
              className="listingform__select"
              name="sale_type"
              onChange={(e) => onChange(e)}
              value={sale_type}
            >
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
          </div>

          {/* <div className="listingform__section">
            <label className="listingform__label" htmlFor="sqft">
              Sqft
            </label>
            <input
              className="listingform__select"
              name="sqft"
              onChange={(e) => onChange(e)}
            ></input>
          </div> */}
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="title">
              Title
            </label>
            <textarea
              className="listingform__select"
              name="title"
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              className="listingform__select"
              name="price"
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="slug">
              Slug
            </label>
            <input
              className="listingform__select"
              name="slug"
              onChange={(e) => onChange(e)}
            ></input>
          </div>
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="bedrooms">
              Bedrooms
            </label>
            <input
              className="listingform__select"
              name="bedrooms"
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <div className="listingform__label">
            <label className="listingform__label" htmlFor="photo_main">Upload: 
            </label>
            <input
            type='file'
              className="listingform__select"
              name="photo_main"
              onChange={(e) => onChange(e)}
            ></input>
          </div>
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="home_type">
              Home Type
            </label>
            <select
              className="listingform__select"
              name="_home_type"
              onChange={(e) => onChange(e)}
              value={_home_type}
            >
              <option>House</option>
              <option>Condo</option>
              <option>Townhouse</option>
            </select>
          </div>

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="description">
              Description
            </label>
            <textarea
              className="listingform__select"
              name="description"
              onChange={(e) => onChange(e)}
            ></textarea>
           </div> 


        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="bathrooms">
              Baths
            </label>
            <select
              className="listingform__select"
              name="bathrooms"
              onChange={(e) => onChange(e)}
              value={bathrooms}
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="listingform__altsection">
            <label className="listingform__label" htmlFor="open_house">
              Open House
            </label>
            <input
              className="listingform__checkbox"
              name="open_house"
              type="checkbox"
            />
          </div>
        </div>

        {/* <div className="listingform__section">
            <label className="listingform__label" htmlFor="_sqmt">
              Sqmt
            
            </label>
            <input
              type="number"
              className="listingform__select"
              name="_sqmt"
              onChange={(e) => _onChange(e)}
            ></input>
          </div> */}
      </div>
      <div className="row">
        <h1>Property</h1>
        <br></br>


        <div className="col-1-of-6">

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="_title">
              Title
            </label>
            <textarea
              className="listingform__select"
              name="_title"
              onChange={(e) => _onchange(e)}
            ></textarea>
          </div>

          <div className="listingform__label">
            Upload Image :
            <input type="file" _onChange={(e) => handleFile(e)} />
          </div>
        </div>
        <div className="col-1-of-6">
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="_address">
              Address
            </label>
            <textarea
              className="listingform__select"
              name="_address"
              onChange={(e) => _onchange(e)}
            ></textarea>
          </div>
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="_sqmt">
              Sqmt
            </label>
            <input
              type="number"
              className="listingform__select"
              name="_sqmt"
              onChange={(e) => _onchange(e)}
            ></input>
          </div>

          {/* <div className="listingform__section">
            <label className="listingform__label" htmlFor="_city">
              City
            </label>
            <textarea
              className="listingform__select"
              name="_city"
              onChange={(e) => _onChange(e)}
            ></textarea>
          </div> */}
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="_zipcode">
              zipcode
            </label>
            <input
              type="number"
              className="listingform__select"
              name="_zipcode"
              onChange={(e) => _onchange(e)}
            ></input>
          </div>

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="_bedrooms">
              bedrooms
            </label>
            <input
              type="number"
              className="listingform__select"
              name="_bedrooms"
              onChange={(e) => _onchange(e)}
            ></input>
          </div>
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="_bathrooms">
              bathrooms
            </label>
            <input
              type="number"
              className="listingform__select"
              name="_bathrooms"
              onChange={(e) => _onchange(e)}
            ></input>
          </div>

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="_city">
              City
            </label>
            <textarea
              className="listingform__select"
              name="_city"
              onChange={(e) => _onchange(e)}
            ></textarea>
          </div>
        </div>

        <div className="col-1-of-6">
          
            <div className="listingform__section">
              <label className="listingform__label" htmlFor="_home_type">
                Home Type
              </label>
              <select
                className="listingform__select"
                name="_home_type"
                onChange={(e) => _onchange(e)}
                value={_home_type}
              >
                <option>House</option>
                <option>Condo</option>
                <option>Townhouse</option>
              </select>
            </div>
            
          

          
        </div>
        <div className='row'>
        <div className="col-1-of-6">
            <div className="listingform__section">
              <label className="listingform__label" htmlFor="_slug">
                slug
              </label>
              <input
                type="text"
                className="listingform__select"
                name="_slug"
                onChange={(e) => _onchange(e)}
              ></input>
            </div>

            <div className="col-1-of-6">
          {loading ? (
            <div className="listingform__loader">
              <Loader type="Oval" color="#424242" height={50} width={50} />
            </div>
          ) : (
            <button className="listingform__button listingform__button--primary">
              Create
            </button>
          )}
        </div>
            
          </div>
        </div>
      </div>
    </form>
  );
};

CreateListing.propTypes = {
  setListings: PropTypes.func.isRequired,
};

export default CreateListing;
