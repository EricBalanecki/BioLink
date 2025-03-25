import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    CardContent,
    Container,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ImportPDF.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ImportPDF = () => {
    const navigate = useNavigate();

    // static categories
    const categories = {
        "Infectious Disease Research": ["Influenza", "RSV", "Mpox", "Viral Research Comprehensive Solutions", "SARS-CoV-2"],
        "CRO Services": ["Protein Production and Development", "Service Highlights", "Compound Screening and Profiling", "Enzyme and Assay Development", "Antibody Production and Development"],
        "Emerging Therapeutic Targets": ["Oncology Research", "Immune Checkpoints", "Drug Target Research Solutions", "Featured Targets", "Biomarkers"],
        "Cell Therapy": ["CAR-NK", "CAR-T", "GMP-grade", "Featured Targets"],
        "Stem Cell Research": ["Biomarkers", "Stem Cell Research Solutions", "Organoid Research", "iPSC"],
        "Antibodies": ["IHC", "Tag Antibodies", "Antibodies Comprehensive Solutions", "FACS", "Featured Antibodies"],
        "Neurodegenerative Diseases Research": ["Neural Research Targets", "Neural Research Solutions", "Neurotrophins and Receptors"],
        "Cytokines and Growth Factors": ["Cytokine Comprehensive Solutions", "Organoid Research", "GMP-grade", "Featured Cytokines"],
        "Signaling Research": ["Ubiquitin", "Product Highlights", "Enzymes", "Kinases"],
        "Immune Checkpoints": ["Featured Targets"],
        "ADC therapy": ["ADC Comprehensive Solutions"],
        "Lab Consumables": ["N.A."],
        "Miscellaneous": ["N.A."],
        "eBooks and Whitepapers": ["N.A."],
        "Sino New Product Release": ["2024", "2023"],
        "SCB New Product Release": ["2024"]
    };
    
    const { user } = useContext(AuthContext);


    // useEffect(() => {
    //     if (!user) {
    //         navigate("/login"); // Redirect to login if not authenticated
    //     }
    // }, [user, navigate]);
    
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [pdfName, setPdfName] = useState("");
    const [file, setFile] = useState(null);
    const [brochures, setBrochures] = useState([]);

    useEffect(() => {
        if (category && subcategory) {
            fetch(`/common/pdfs?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`)
                .then((response) => response.json())
                .then((data) => setBrochures(data))
                .catch((error) => console.error("Error fetching brochures:", error));
        }
    }, [category, subcategory]);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setPdfName(uploadedFile.name.replace(".pdf", ""));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!category || !subcategory || !pdfName || !file) {
            alert("Please fill in all fields and upload a PDF.");
            return;
        }
        const formData = new FormData();
        formData.append("name", pdfName);
        formData.append("category", category);
        formData.append("subcategory", subcategory);
        formData.append("pdfFile", file);

        try {
            const response = await fetch("/api/pdfs", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                alert("PDF imported successfully!");
                navigate("/");
            } else {
                alert("Error uploading PDF.");
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const handleDelete = async (pdfName) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the PDF: ${pdfName}?`);
    
        if (!isConfirmed) {
            return; // Exit if the user cancels
        }
    
        try {
            const response = await fetch(`/api/pdfs/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: pdfName,
                    category,
                    subcategory,
                }),
            });
    
            if (response.ok) {
                setBrochures(brochures.filter((pdf) => pdf.name !== pdfName));
                alert("PDF deleted successfully!");
            } else {
                alert("Error deleting PDF.");
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };
    
    

    return (user &&  user.import === 1) ? (
        <div className="import-pdf-container">
            <Typography className="import-pdf-title">Import PDF</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setSubcategory("");
                        setBrochures([]);
                    }}
                >
                    {Object.keys(categories).map((cat, index) => (
                        <MenuItem key={index} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {category && (
                <FormControl fullWidth margin="normal">
                    <InputLabel>Subcategory</InputLabel>
                    <Select
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                    >
                        {categories[category].map((sub, index) => (
                            <MenuItem key={index} value={sub}>{sub}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            <TextField
                fullWidth
                margin="normal"
                label="PDF Name"
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
            />
            <div className="import-pdf-dropzone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
                e.preventDefault();
                handleFileChange({ target: { files: e.dataTransfer.files } });
            }}>
                <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
                <CloudUploadIcon className="import-pdf-icon" />
                <Typography className="import-pdf-filename">
                    {file ? file.name : "Drag & Drop or Click to Upload PDF"}
                </Typography>
            </div>
            <Button className="import-pdf-button" onClick={handleSubmit} disabled={!user || !user.email.includes("@sinobiological")}>Import PDF</Button>
            {brochures.length > 0 && (
                <CardContent className="brochure-list">
                    {brochures.map((item, index) => (
                        <div key={index} className="list-item">
                            <span className="list-name">{item.name}</span>
                            <Button sx={{ color: "#d32f2f" }} onClick={() => handleDelete(item.name)}>
                                <DeleteIcon />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            )}
        </div>
    ) : user === null ? (
        <Container style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h4">Loading...</Typography>
        </Container>
    ) : (
        <Container style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h4" color="error">
                Unauthorized Access
                
            </Typography>
        </Container>
)};

export default ImportPDF;
