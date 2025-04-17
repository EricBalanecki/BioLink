

// List of Categories with their subcategories
export const categories = {
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


// List of categories sorted by home links with their respective images (CRO Services only has one category so skips directly so subcat page)
export const catalogProducts = [
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

export const eBooksWhitepapers = [
  { name: "eBooks and Whitepapers", image: require('../assets/images/WhitePapers.png') },
  { name: "Sino New Product Release", image: require('../assets/images/New Product Release.png')},
  { name: "SCB New Product Release", image: require('../assets/images/New Product Release.png')},
]