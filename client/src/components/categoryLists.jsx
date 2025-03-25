import React from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import Box from '@mui/material/Box';
import './categoryLists.css';

const catalogProducts = [
    { name: "Infectious Disease Research", image: require('../assets/images/Infectious_Disease.png') },
    { name: "Emerging Therapeutic Targets", image: require('../assets/images/Emerging_Therapeutic_Targets.png') },
    { name: "Cell Therapy", image: require('../assets/images/Cell Therapy.png') },
    { name: "Immune Checkpoints", image: require('../assets/images/immune_checkpoints.png') },
    { name: "Cytokines and Growth Factors", image: require('../assets/images/cytokines.png') },
    { name: "Stem Cell Research", image: require('../assets/images/Stem Cell Therapy.png') },
    { name: "Neurodegenerative Diseases Research", image: require('../assets/images/Neurodegenerative Disease Research.png') },
    { name: "Antibodies", image: require('../assets/images/Antibody.png') },
    // { name: "CRO Services", image: require('../assets/images/10. CRO Researc.png')},
    { name: "Miscellaneous", image: require('../assets/images/Miscelaneous.png')},
    { name: "Signaling Research", image: require('../assets/images/Signaling Research.png') },
    { name: "ADC Therapy", image: require('../assets/images/ADC Therapy.png') },
    { name: "Lab Consumables", image: require('../assets/images/Lab Consumables.png') },
];

const eBooksWhitepapers = [
    { name: "eBooks and Whitepapers", image: require('../assets/images/WhitePapers.png') },
    { name: "Sino New Product Release", image: require('../assets/images/New Product Release.png')},
    { name: "SCB New Product Release", image: require('../assets/images/New Product Release.png')},
]

const CategoryLists = ({ type }) => {
    const navigate = useNavigate();

    // Determine which category list to use
    let categories = [];
    if (type === "eBooks") {
        categories = eBooksWhitepapers;
    } else {
        categories = catalogProducts; // Default to catalog products
    }
    

    const goToNewPage = (category) => {
        console.log(category);
        navigate(`/brochureLists/${encodeURIComponent(category)}`);
    };

    return (
        <div className='path-container'>
            <div className="category-list-container">
                {categories.map((category, index) => (
                    <Box
                        key={index}
                        className="category-box"
                        onClick={() => goToNewPage(category.name)}
                    >
                        <div className="category-text">{category.name}</div>
                        <div className="category-image">
                            <img src={category.image} alt={category.name} />
                        </div>
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default CategoryLists;
