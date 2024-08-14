import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DogDetailViewPage.css'; // Adjust the path as needed


import dogImage from '../../assets/dog.jpg'; // Adjust the path as needed
import dogImage22 from '../../assets/dog2.jpg'; // Adjust the path as needed
import dogImage33 from '../../assets/dog3.jpg'; // Adjust the path as needed
import dogImage44 from '../../assets/dog4.jpg'; // Adjust the path as needed
import dogImage55 from '../../assets/dog5.jpg'; // Adjust the path as needed
import dogImage66 from '../../assets/dog6.jpg'; // Adjust the path as needed
import dogImage77 from '../../assets/dog7.jpg'; // Adjust the path as needed
import dogImage88 from '../../assets/dog8.jpg'; // Adjust the path as needed
import dogImage99 from '../../assets/dog9.jpg'; // Adjust the path as needed

import { Header, Footer } from '../Homepage';
import MapComponent from './MapComponent'; // Import Map Component
import Gallery from './Gallery'; // Import Gallery Component
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

// Sample data or you can fetch from API
const initialProducts = [
  { 
    id: 1, 
    dogName: 'Alex', 
    price: 990, 
    description: 'A very friendly and playful dog.', 
    breed: 'Labrador', 
    age: '2 years', 
    gender: 'Male', 
    color: 'Brown', 
    vaccinationStatus: 'Up to date', 
    veterinaryRecords: 'Fully vaccinated, neutered, and microchipped.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage, dogImage, dogImage],
    imageUrl: dogImage,
    owner: {
      name: 'John Doe',
      contact: '123-456-7890',
      email: 'john.doe@example.com',
      address: '123 Dog Street, Pet City, PC 12345',
      social: {
        facebook: 'https://facebook.com/johndoe',
        whatsapp: 'https://wa.me/1234567890',
        instagram: 'https://instagram.com/johndoe'
      }
    }
  },
  { 
    id: 2, 
    dogName: 'Cool', 
    price: 860, 
    description: 'A cool and calm dog.', 
    breed: 'German Shepherd', 
    age: '1 year', 
    gender: 'Female', 
    color: 'Black and Tan', 
    vaccinationStatus: 'Up to date', 
    veterinaryRecords: 'Fully vaccinated and spayed.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage22, dogImage22, dogImage22],
    imageUrl: dogImage22,
    owner: {
      name: 'Jane Smith',
      contact: '987-654-3210',
      email: 'jane.smith@example.com',
      address: '456 Dog Avenue, Pet Town, PT 67890',
      social: {
        facebook: 'https://facebook.com/janesmith',
        whatsapp: 'https://wa.me/9876543210',
        instagram: 'https://instagram.com/janesmith'
      }
    }
  },
  { 
    id: 3, 
    dogName: 'de Dog ', 
    price: 1120, 
    description: 'An amazing dog with great skills.', 
    breed: 'Beagle', 
    age: '1.5 years', 
    gender: 'Male', 
    color: 'Tri-color', 
    vaccinationStatus: 'Up to date', 
    veterinaryRecords: 'Fully vaccinated and microchipped.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage33, dogImage33, dogImage33],
    imageUrl: dogImage33,
    owner: {
      name: 'Alice Johnson',
      contact: '555-555-5555',
      email: 'alice.johnson@example.com',
      address: '789 Puppy Road, Pet Village, PV 11223',
      social: {
        facebook: 'https://facebook.com/alicejohnson',
        whatsapp: 'https://wa.me/5555555555',
        instagram: 'https://instagram.com/alicejohnson'
      }
    }
  },
  {
    id: 4,
    dogName: 'Buddy',
    price: 1300,
    description: 'A friendly and loyal dog.',
    breed: 'Bulldog',
    age: '2 years',
    gender: 'Male',
    color: 'White and Brown',
    vaccinationStatus: 'Up to date',
    veterinaryRecords: 'Fully vaccinated and microchipped.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage44, dogImage44, dogImage44],
    imageUrl: dogImage44,
    owner: {
      name: 'Michael Brown',
      contact: '321-654-9870',
      email: 'michael.brown@example.com',
      address: '789 Dog Lane, Pet County, PC 56789',
      social: {
        facebook: 'https://facebook.com/michaelbrown',
        whatsapp: 'https://wa.me/3216549870',
        instagram: 'https://instagram.com/michaelbrown'
      }
    }
  },
  {
    id: 5,
    dogName: 'Bella',
    price: 950,
    description: 'A cute and cheerful dog.',
    breed: 'Poodle',
    age: '1.5 years',
    gender: 'Female',
    color: 'White',
    vaccinationStatus: 'Up to date',
    veterinaryRecords: 'Fully vaccinated and spayed.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage55, dogImage55, dogImage55],
    imageUrl: dogImage55,
    owner: {
      name: 'Emma White',
      contact: '456-789-0123',
      email: 'emma.white@example.com',
      address: '456 Pet Lane, Pet City, PC 23456',
      social: {
        facebook: 'https://facebook.com/emmawhite',
        whatsapp: 'https://wa.me/4567890123',
        instagram: 'https://instagram.com/emmawhite'
      }
    }
  },
  {
    id: 6,
    dogName: 'Max',
    price: 1250,
    description: 'A strong and protective dog.',
    breed: 'Rottweiler',
    age: '2 years',
    gender: 'Male',
    color: 'Black and Tan',
    vaccinationStatus: 'Up to date',
    veterinaryRecords: 'Fully vaccinated and neutered.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage66, dogImage66, dogImage66],
    imageUrl: dogImage66,
    owner: {
      name: 'James Green',
      contact: '654-321-0987',
      email: 'james.green@example.com',
      address: '123 Pet Road, Pet Town, PT 34567',
      social: {
        facebook: 'https://facebook.com/jamesgreen',
        whatsapp: 'https://wa.me/6543210987',
        instagram: 'https://instagram.com/jamesgreen'
      }
    }
  },
  {
    id: 7,
    dogName: 'Lucy',
    price: 870,
    description: 'A small and lively dog.',
    breed: 'Dachshund',
    age: '1 year',
    gender: 'Female',
    color: 'Black and Tan',
    vaccinationStatus: 'Up to date',
    veterinaryRecords: 'Fully vaccinated and spayed.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage77, dogImage77, dogImage77],
    imageUrl: dogImage77,
    owner: {
      name: 'Olivia Blue',
      contact: '789-456-1230',
      email: 'olivia.blue@example.com',
      address: '456 Dog Street, Pet Village, PV 45678',
      social: {
        facebook: 'https://facebook.com/oliviablue',
        whatsapp: 'https://wa.me/7894561230',
        instagram: 'https://instagram.com/oliviablue'
      }
    }
  },
  {
    id: 8,
    dogName: 'Rocky',
    price: 1100,
    description: 'A brave and energetic dog.',
    breed: 'Boxer',
    age: '1.5 years',
    gender: 'Male',
    color: 'Fawn',
    vaccinationStatus: 'Up to date',
    veterinaryRecords: 'Fully vaccinated and neutered.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage88, dogImage88, dogImage88],
    imageUrl: dogImage88,
    owner: {
      name: 'William Black',
      contact: '123-789-4560',
      email: 'william.black@example.com',
      address: '789 Pet Avenue, Pet City, PC 67890',
      social: {
        facebook: 'https://facebook.com/williamblack',
        whatsapp: 'https://wa.me/1237894560',
        instagram: 'https://instagram.com/williamblack'
      }
    }
  },
  {
    id: 9,
    dogName: 'Daisy',
    price: 890,
    description: 'A small and affectionate dog.',
    breed: 'Shih Tzu',
    age: '1 year',
    gender: 'Female',
    color: 'White and Brown',
    vaccinationStatus: 'Up to date',
    veterinaryRecords: 'Fully vaccinated and spayed.',
    adoptionStatus: 'Available for adoption',
    gallery: [dogImage99, dogImage99, dogImage99],
    imageUrl: dogImage99,
    owner: {
      name: 'Sophia Gray',
      contact: '321-987-6540',
      email: 'sophia.gray@example.com',
      address: '123 Puppy Lane, Pet Town, PT 78901',
      social: {
        facebook: 'https://facebook.com/sophiagray',
        whatsapp: 'https://wa.me/3219876540',
        instagram: 'https://instagram.com/sophiagray'
      }
    }
  }
  // Other products
];

const DogDetailViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const product = initialProducts.find(p => p.id === parseInt(id));
    setSelectedProduct(product);
  }, [id]);

  return (
    <body className='ok'>

    <div className='dog-detail-page-container'>
      <Header />
            <br/>
            <br/>
            <br/>
            <br/>
      <div className="dog-detail-page-wrapper">
        <header className="dog-detail-page-header">
          <nav className="breadcrumb-navigation">
            <a href="#">Home</a> / <a href="#">All Products</a> / <a href="#">Product Details</a>
          </nav>
        </header>
        <main className="dog-detail-main-content">
          {selectedProduct ? (
            <div className="dog-detail-info-section">
              <section className="dog-detail-info">
                <h1 className="dog-detail-title">{selectedProduct.dogName}</h1>
                <img src={selectedProduct.imageUrl} alt={selectedProduct.dogName} className="dog-detail-image" />
                
                <Gallery images={selectedProduct.gallery} /> {/* Render Gallery */}
                
                <div className="dog-detail-main-info">
                  <h2 className="info-section-title">Details</h2>
                  <p className="info-item"><strong>Price:</strong> ₹{selectedProduct.price}</p>
                  <p className="info-item"><strong>Breed:</strong> {selectedProduct.breed}</p>
                  <p className="info-item"><strong>Age:</strong> {selectedProduct.age}</p>
                  <p className="info-item"><strong>Gender:</strong> {selectedProduct.gender}</p>
                  <p className="info-item"><strong>Color:</strong> {selectedProduct.color}</p>
                  <p className="info-item"><strong>Vaccination Status:</strong> {selectedProduct.vaccinationStatus}</p>
                  <p className="info-item"><strong>Veterinary Records:</strong> {selectedProduct.veterinaryRecords}</p>
                  <p className="info-item"><strong>Adoption Status:</strong> {selectedProduct.adoptionStatus}</p>
                  <p className="info-item"><strong>Description:</strong> {selectedProduct.description}</p>
                </div>
              </section>
              
              <section className="dog-owner-info">
                <h2 className="info-section-title">Owner Information</h2>
                <p className="owner-info-item"><strong>Name:</strong> {selectedProduct.owner.name}</p>
                <p className="owner-info-item"><strong>Contact:</strong> {selectedProduct.owner.contact}</p>
                <p className="owner-info-item"><strong>Email:</strong> {selectedProduct.owner.email}</p>
                <p className="owner-info-item"><strong>Address:</strong> {selectedProduct.owner.address}</p>
                
                <div className="social-media-links">
                  <a href={selectedProduct.owner.social.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href={selectedProduct.owner.social.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href={selectedProduct.owner.social.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </section>
              
              {/* Uncomment the following if you want to add a map */}
              {/* <MapComponent address={selectedProduct.owner.address} /> */}
              
              {/* <button className="back-to-list-button" onClick={() => navigate('/')}>Back to List</button> */}
            </div>
          ) : (
            <div className="product-not-found-message">Product not found</div>
          )}
        </main>
      </div>
      <Footer />
    </div>
          </body>
  );
};

export default DogDetailViewPage;
