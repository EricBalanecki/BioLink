import React, { useState, useEffect } from "react";
import "./category.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card, CardContent, CardActions } from "@mui/material";
import { ExpandMore, ExpandLess, Download } from "@mui/icons-material";
import ShareComponentMulti from "./ShareComponentMulti";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Category = ({ category }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showShareModal, setShowShareModal] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getSubcategories = async () => {
            try {
                const response = await fetch(`/common/subcategories?category=${encodeURIComponent(category)}`);
                if (response.ok) {
                    const data = await response.json();
                    setSubcategories(
                        data.map((sub) => ({
                            name: sub.name,
                            brochures: [],
                            expanded: false,
                        }))
                    );
                }
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        const updateLog = async () => {
            try {
                let person = ''; 
                if (user) {
                    person = user.email;
                } else {
                    person = 'Guest';
                }

                const response = await fetch("/common/log", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: person,
                        page: category,
                    }),
                });
            } catch (error) {
                console.error("Error updating log:", error);
            }
        }
        getSubcategories();
        updateLog();
    }, [category]);

    const toggleSubcategory = async (index) => {
        setSubcategories((prev) =>
            prev.map((sub, i) =>
                i === index ? { ...sub, expanded: !sub.expanded } : sub
            )
        );

        if (!subcategories[index].brochures.length) {
            try {
                const response = await fetch(`/common/pdfs?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategories[index].name)}`);
                if (response.ok) {
                    const data = await response.json();
                    setSubcategories((prev) =>
                        prev.map((sub, i) =>
                            i === index
                                ? {
                                      ...sub,
                                      brochures: data.map((item) => ({
                                          name: item.name,
                                          selected: false,
                                      })),
                                  }
                                : sub
                        )
                    );
                }
            } catch (error) {
                console.error("Error fetching brochures:", error);
            }
        }
    };

    const handleDownload = async (subcategory, name) => {
        const fullName = `${name}.pdf`;
        const downloadUrl = `/download/pdf?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&brochureName=${encodeURIComponent(fullName)}`;

        console.log("Downloading from:", downloadUrl);
    
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fullName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleSelection = (subIndex, broIndex) => {
        setSubcategories((prev) => {
            const updated = [...prev];
            updated[subIndex].brochures[broIndex].selected = !updated[subIndex].brochures[broIndex].selected;
            return updated;
        });
    };

    const goToDetailPage = (subcategory, name) => {
        navigate(`/brochureDetails/${encodeURIComponent(category)}/${subcategory}/${encodeURIComponent(name)}`, {
            state: { category, subcategory, item: name },
        });
    };

    const handleShare = () => {
        const checkedItems = subcategories.flatMap((sub) =>
            sub.brochures
                .filter((item) => item.selected)
                .map((item) => ({
                    name: item.name,
                    link: `https://info.sinobiologicalus.com/brochureDetails/${encodeURIComponent(category)}/${encodeURIComponent(sub.name)}/${encodeURIComponent(item.name)}`
                }))
        );
        setSelectedItems(checkedItems);
        setShowShareModal(true);
    };

    return (
        <div className="path-container">
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShare}
                    disabled={
                        !user ||
                        subcategories.every((sub) =>
                            sub.brochures.every((item) => !item.selected)
                    )}
                >
                    Share Selected
                </Button>
            </CardActions>
            <div className="category-container">
                <h2>{category} List</h2>
                {subcategories.map((sub, index) => (
                    <Card key={index} className="subcategory-card">
                        <CardContent
                            className="subcategory-header"
                            onClick={() => toggleSubcategory(index)}
                        >
                            <div className="subcategory-title">
                                {sub.name !== "N.A." ? (
                                    <>
                                        {sub.name} {sub.expanded ? <ExpandLess /> : <ExpandMore />}
                                    </>
                                ) : (
                                    <span style={{ marginLeft: "auto" }}>
                                        {sub.expanded ? <ExpandLess /> : <ExpandMore />}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                        {sub.expanded && (
                            <CardContent className="brochure-list">
                                {sub.brochures.map((item, broIndex) => (
                                    <div
                                        key={broIndex}
                                        className={`list-item ${item.selected ? "selected" : ""}`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={item.selected}
                                            onChange={() => toggleSelection(index, broIndex)}
                                        />
                                        <span
                                            className="list-name"
                                            onClick={() => goToDetailPage(sub.name, item.name)}
                                        >
                                            {item.name}
                                        </span>
                                        <Button 
                                            sx={{ color: "#208871" }}
                                            onMouseEnter={(e) => e.stopPropagation()}
                                            onMouseLeave={(e) => e.stopPropagation()}
                                            onClick={() => handleDownload(sub.name, item.name)}
                                        >
                                            <Download />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        )}
                    </Card>
                ))}
                {/* Modal Popup for Sharing */}
                {showShareModal && (
                    <ShareComponentMulti
                        onClose={() => setShowShareModal(false)}
                        selectedItems={selectedItems}
                    />
                )}
            </div>
        </div>
    );
};

export default Category;
