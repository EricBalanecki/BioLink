import * as React from "react";
import { styled, alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuPNG from "../assets/images/LogoGlobe.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const theme = createTheme({
  palette: {
    customColor: { main: "#208871" },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(1), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": { width: "20ch" },
    },
  },
}));

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userAnchor, setUserAnchor] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null); 

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

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
    "SCB New Product Release": ["2024"],
  };

  // Sort alphabetically
  const sortedCategories = Object.keys(categories).sort();
  sortedCategories.unshift("Home"); // Add "Home" at the top
  
  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]); // Clear results if empty search
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/common/search?search=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => fetchSearchResults(searchQuery), 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
};
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="custom-appbar" sx={{ height: "64px", display: "flex", justifyContent: "center" }}>
          <Toolbar sx={{ minHeight: "64px", padding: 0 }}>
            <Box sx={{ width: "800px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: 1, paddingLeft: 1 }}>
              {/* Menu Button (Dropdown) */}
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={(e) => setMenuAnchor(e.currentTarget)}
              >
                  <img src={MenuPNG} alt="Menu" width="30" height="30" />
              </IconButton>


              {/* Dropdown Menu */}
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                sx={{
                  mt: 1, // Margin from the top
                }}
                MenuListProps={{
                  sx: {
                    width: "350px", // Fits within header width
                  },
                }}
              >
                {sortedCategories.map((category, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      if (category === "Home") {
                        navigate("/"); //Redirect to Home page
                     } else {
                        navigate(`/brochureLists/${encodeURIComponent(category)}`);
                      }
                    setMenuAnchor(null); // Close menu after clicking
                     }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu>
              {/* Search Bar */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>
              {/* User Login / Profile */}
              <Box>
                {user ? (
                  <>
                    <IconButton size="large" edge="end" color="inherit" onClick={(e) => setUserAnchor(e.currentTarget)}>
                      <AccountCircleIcon />
                    </IconButton>
                    <Menu anchorEl={userAnchor} open={Boolean(userAnchor)} onClose={() => setUserAnchor(null)}>
                      <MenuItem>{user.email}</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      {user.import === 1 && (
                        <MenuItem onClick={() => navigate("/import")}>Import</MenuItem>
                      )}
                    </Menu>
                  </>
                ) : (
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Display Search Status */}
        <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 2 }}>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          {/* Search Results List */}
          {!loading && searchResults.length > 0 && (
            <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
              <Typography variant="h6">Search Results:</Typography>
              <List>
                {searchResults.map((result, index) => (
                  <ListItem key={index} button onClick={() => (window.location.href = result.filePath)}>
                    <ListItemText primary={result.name} secondary={`Category: ${result.category} | Subcategory: ${result.subcategory}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* No Results Found Message */}
          {!loading && searchQuery && searchResults.length === 0 && (
            <Typography sx={{ mt: 2 }} color="textSecondary">
              No results found.
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
