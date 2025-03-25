import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PDF from '../components/pdf';

const BrochureDetails = () => {
    const {category, subcategory, index} = useParams();
    const cat = category.replace(/&/g, "");
    const subcat = subcategory.replace(/&/g, "");
    const name_link = index.replace(/%20/g, " ");

    console.log("Category from URL:", category);
    console.log("Index (fileName) from URL:", index);


    
    /*const [brochureInfo, setBrochureInfo] = useState([]);
     useEffect(() => {
     const getBrochureInfo = async () => {
     try {
     //remove & in the category
     const cat = category.replace(/&/g, "");
     //get data from the back end server, update link to live link later http://sinobio.myds.me:8888
     const response = await fetch(`http://localhost:8888/common/brochure?category=${cat}&brochure=${id}`);
     if (response.ok) {
     const data = await response.json();
     setBrochureInfo(data);
     }
     } catch (error) {
     console.error('Error feteching data:', error);
     }
     }
     getBrochureInfo();
     }, [])*/
    return (
            <PDF
                category={ cat }
                subcategory = { subcat }
                name={ name_link }
                />
            )
}

export default BrochureDetails
