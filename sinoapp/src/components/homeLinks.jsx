import React from 'react'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import '../assets/css/main.css';
import background1 from '../assets/images/landingPage/CatalogProducts.jpg'
import background2 from '../assets/images/landingPage/CROservices.jpg'
import background3 from '../assets/images/landingPage/eBooksWhitepapers.jpeg'

const HomeLinks = () => {
    const navigate = useNavigate()
    const gotToNewPage = (link) => {
        console.log(link)
        navigate(`${link}`);
    }
    const skipCategories = (link) => {
        console.log(link)
        navigate(`brochureLists/${encodeURIComponent(link)}`);
    }
    return (
            <div className='container home-container path-container'> 
              <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
                BioLink
              </h1>
                <div className='grid col-12 '>
                  <Box component="section"
                       color={"white"}
                       display="grid"
                       textAlign="center"
                       p={2}
                       sx={{
                        border: '1px solid grey',
                        backgroundImage: `url(${background1})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        '&:hover': {
                         transform: 'scale(1.03)',
                         boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                         borderColor: 'grey',
                       },
                         '&:active': {
                         transform: 'scale(0.98)',
                         boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',
                       }
                     }}
                       onClick={() => gotToNewPage('catalogProducts') }><p>Catalog Products</p></Box>
                    <Box component="section"
                       color={"white"}
                       display="grid"
                       textAlign="center"
                       p={2}
                       sx={{
                        border: '1px solid grey',
                        backgroundImage: `url(${background2})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        '&:hover': {
                         transform: 'scale(1.03)',
                         boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                         borderColor: 'grey',
                       },
                         '&:active': {
                         transform: 'scale(0.98)',
                         boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',
                       }
                     }}
                       onClick={() => skipCategories('CRO Services') }><p>CRO Services</p></Box>
                    <Box component="section"
                       color={"white"}
                       display="grid"
                       textAlign="center"
                       p={2}
                       sx={{
                               border: '1px solid grey',
                               backgroundImage: `url(${background3})`,
                               backgroundRepeat: "no-repeat",
                               backgroundSize: "cover",
                               '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                                borderColor: 'grey',
                              },
                                '&:active': {
                                transform: 'scale(0.98)',
                                boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',
                              }
                            }}
                       onClick={() => gotToNewPage('eBooks') }><p>eBooks/Whitepapers</p></Box>
                </div>
            </div>
            )
}

export default HomeLinks