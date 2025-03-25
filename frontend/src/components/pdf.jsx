import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Button from '@mui/material/Button';
import {  ArrowBack, ArrowForward } from "@mui/icons-material";
import ShareComponentMulti from './ShareComponentMulti';
import './ShareComponent.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './pdf.css';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF = React.memo(({ category, subcategory, name }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Setting 1 to show the first page
    const [showShare, setShowShare] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const { user } = useContext(AuthContext);
      
    const brochure = {
        name: name,
        link: `https://info.sinobiologicalus.com/brochureDetails/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}/${encodeURIComponent(name)}`
    };

    const brochures = [brochure];
    

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const changePage = (offset) => {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    };

    const previousPage = () => {
        changePage(-1);
    };

    const nextPage = () => {
        changePage(1);
    };

    const toggleShare = () => {
        setShowShare(!showShare);
    };

    const handleDownload = async () => {
        const fullName = `${name}.pdf`;
        const downloadUrl = `/download/pdf?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&brochureName=${encodeURIComponent(fullName)}`;

        console.log("Downloading from:", downloadUrl);
    
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fullName); // Ensures download behavior
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const height = document.getElementsByClassName('PdfDiv')[0]?.clientHeight * 0.8 || 500;
    const width = document.getElementsByClassName('PdfDiv')[0]?.clientWidth * 0.9 || 300;

    return (
        
        <div className='path-container'>
            {/* <nav className="nav-bar">
                <ArrowBack
                    className="back-arrow"
                    onClick={() => navigate(-1)}
                    style={{ cursor: "pointer" }}
                />
            </nav> */}
            <div className="pdf-item">
                <div className="page-containger">
                    <Button disabled={pageNumber <= 1} onClick={previousPage}>
                        <ArrowBack/>
                    </Button>
                    <Button disabled={pageNumber >= numPages} onClick={nextPage}>
                        <ArrowForward/>
                    </Button>
                </div>
                <Document
                    file={`/public/pdfs/${decodeURIComponent(category)}/${subcategory}/${decodeURIComponent(name)}.pdf`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="PdfDiv"
                >
                    <Page pageNumber={pageNumber} height={height} width={width} />
                </Document>
                <div className="page-containger">
                    <p>
                        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                    </p>
                    <Button disabled={pageNumber <= 1} onClick={previousPage}>
                        <ArrowBack/>
                    </Button>
                    <Button disabled={pageNumber >= numPages} onClick={nextPage}>
                        <ArrowForward/>
                    </Button>
                    <Button onClick={handleDownload}>Download</Button>
                    { user && (
                        <Button onClick={() => setShowShareModal(true)}>Share</Button>
                    )}
                </div>
                {/* {showShare && <ShareComponent onClose={toggleShare} />} */}
            </div>
            {/* Modal Popup for Sharing */}
            {showShareModal && (
                <ShareComponentMulti
                    onClose={() => setShowShareModal(false)}
                    selectedItems={brochures}
                />
            )}
        </div>
    );
});

export default React.memo(PDF);