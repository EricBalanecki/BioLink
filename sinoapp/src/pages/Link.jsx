import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Link = () => {
    const { category, subcategory, index, id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const markLinkAsOpened = async () => {
            try {
                await fetch(`/common/link?id=${id}`, { method: "POST" });
            } catch (error) {
                console.error("Error marking link as opened:", error);
            }

            // Navigate *outside* of the async function to prevent issues
            navigate(`/brochureDetails/${category}/${subcategory}/${index}`);
        };

        if (id) {
            markLinkAsOpened();
        }
    }, [id, navigate, category, subcategory, index]); // Added dependencies

    return <CircularProgress />; // No UI needed, since redirection happens immediately
};

export default Link;
