import { Feather } from "@expo/vector-icons";

export type SelectOption = {
    value: string;
    label: string;
    category: string;
};

export type RoleCategory = {
    id: string;
    label: string;
    icon: keyof typeof Feather.glyphMap;
};

export const ROLE_CATEGORIES: RoleCategory[] = [
    { id: 'ALL', label: 'All roles', icon: 'grid' },
    { id: 'SOFTWARE', label: 'Software', icon: 'code' },
    { id: 'MECHANICAL', label: 'Mechanical', icon: 'settings' },
    { id: 'CIVIL', label: 'Civil', icon: 'layers' },
    { id: 'ELECTRICAL', label: 'Electrical', icon: 'zap' },
    { id: 'CHEMICAL', label: 'Chemical', icon: 'droplet' },
    { id: 'OTHER', label: 'Other', icon: 'cpu' },
    { id: 'ACADEMIC', label: 'Academic', icon: 'book-open' },
];

// --------------------------------------------------
// Engineering Roles
// --------------------------------------------------

export const ENGINEERING_ROLES: SelectOption[] = [
    // Software & IT
    { value: 'SOFTWARE_ENGINEER', label: 'Software Engineer', category: 'SOFTWARE' },
    { value: 'FULL_STACK_DEVELOPER', label: 'Full Stack Developer', category: 'SOFTWARE' },
    { value: 'FRONTEND_DEVELOPER', label: 'Frontend Developer', category: 'SOFTWARE' },
    { value: 'BACKEND_ENGINEER', label: 'Backend Engineer', category: 'SOFTWARE' },
    { value: 'WEB_DEVELOPER', label: 'Web Developer', category: 'SOFTWARE' },
    { value: 'MOBILE_APP_DEVELOPER', label: 'Mobile App Developer', category: 'SOFTWARE' },
    { value: 'DEVOPS_ENGINEER', label: 'DevOps Engineer', category: 'SOFTWARE' },
    { value: 'CLOUD_ENGINEER', label: 'Cloud Engineer', category: 'SOFTWARE' },
    { value: 'AI_ENGINEER', label: 'AI Engineer', category: 'SOFTWARE' },
    { value: 'ML_ENGINEER', label: 'Machine Learning Engineer', category: 'SOFTWARE' },
    { value: 'DATA_ENGINEER', label: 'Data Engineer', category: 'SOFTWARE' },
    { value: 'DATA_SCIENTIST', label: 'Data Scientist', category: 'SOFTWARE' },
    { value: 'CYBERSECURITY_ENGINEER', label: 'Cybersecurity Engineer', category: 'SOFTWARE' },
    { value: 'NETWORK_ENGINEER', label: 'Network Engineer', category: 'SOFTWARE' },
    { value: 'SYSTEMS_ENGINEER', label: 'Systems Engineer', category: 'SOFTWARE' },
    { value: 'DATABASE_ENGINEER', label: 'Database Engineer', category: 'SOFTWARE' },
    { value: 'QA_ENGINEER', label: 'QA Engineer', category: 'SOFTWARE' },
    { value: 'BLOCKCHAIN_ENGINEER', label: 'Blockchain Engineer', category: 'SOFTWARE' },
    { value: 'EMBEDDED_SYSTEMS_ENGINEER', label: 'Embedded Systems Engineer', category: 'SOFTWARE' },
    { value: 'GAME_DEVELOPER', label: 'Game Developer', category: 'SOFTWARE' },

    // Mechanical
    { value: 'MECHANICAL_ENGINEER', label: 'Mechanical Engineer', category: 'MECHANICAL' },
    { value: 'AUTOMOTIVE_ENGINEER', label: 'Automotive Engineer', category: 'MECHANICAL' },
    { value: 'AEROSPACE_ENGINEER', label: 'Aerospace Engineer', category: 'MECHANICAL' },
    { value: 'THERMAL_ENGINEER', label: 'Thermal Engineer', category: 'MECHANICAL' },
    { value: 'DESIGN_ENGINEER', label: 'Design Engineer', category: 'MECHANICAL' },
    { value: 'PRODUCTION_ENGINEER', label: 'Production Engineer', category: 'MECHANICAL' },
    { value: 'MANUFACTURING_ENGINEER', label: 'Manufacturing Engineer', category: 'MECHANICAL' },
    { value: 'INDUSTRIAL_ENGINEER', label: 'Industrial Engineer', category: 'MECHANICAL' },
    { value: 'ROBOTICS_ENGINEER', label: 'Robotics Engineer', category: 'MECHANICAL' },
    { value: 'MECHATRONICS_ENGINEER', label: 'Mechatronics Engineer', category: 'MECHANICAL' },

    // Civil
    { value: 'CIVIL_ENGINEER', label: 'Civil Engineer', category: 'CIVIL' },
    { value: 'STRUCTURAL_ENGINEER', label: 'Structural Engineer', category: 'CIVIL' },
    { value: 'CONSTRUCTION_ENGINEER', label: 'Construction Engineer', category: 'CIVIL' },
    { value: 'GEOTECHNICAL_ENGINEER', label: 'Geotechnical Engineer', category: 'CIVIL' },
    { value: 'TRANSPORTATION_ENGINEER', label: 'Transportation Engineer', category: 'CIVIL' },
    { value: 'ENVIRONMENTAL_ENGINEER', label: 'Environmental Engineer', category: 'CIVIL' },
    { value: 'SURVEY_ENGINEER', label: 'Survey Engineer', category: 'CIVIL' },
    { value: 'WATER_RESOURCES_ENGINEER', label: 'Water Resources Engineer', category: 'CIVIL' },

    // Electrical & Electronics
    { value: 'ELECTRICAL_ENGINEER', label: 'Electrical Engineer', category: 'ELECTRICAL' },
    { value: 'ELECTRONICS_ENGINEER', label: 'Electronics Engineer', category: 'ELECTRICAL' },
    { value: 'ELECTRONICS_COMMUNICATION_ENGINEER', label: 'Electronics & Communication Engineer', category: 'ELECTRICAL' },
    { value: 'VLSI_ENGINEER', label: 'VLSI Engineer', category: 'ELECTRICAL' },
    { value: 'POWER_SYSTEMS_ENGINEER', label: 'Power Systems Engineer', category: 'ELECTRICAL' },
    { value: 'CONTROL_SYSTEMS_ENGINEER', label: 'Control Systems Engineer', category: 'ELECTRICAL' },
    { value: 'INSTRUMENTATION_ENGINEER', label: 'Instrumentation Engineer', category: 'ELECTRICAL' },
    { value: 'TELECOMMUNICATION_ENGINEER', label: 'Telecommunication Engineer', category: 'ELECTRICAL' },
    { value: 'RENEWABLE_ENERGY_ENGINEER', label: 'Renewable Energy Engineer', category: 'ELECTRICAL' },
    { value: 'AUTOMATION_ENGINEER', label: 'Automation Engineer', category: 'ELECTRICAL' },

    // Chemical
    { value: 'CHEMICAL_ENGINEER', label: 'Chemical Engineer', category: 'CHEMICAL' },
    { value: 'PROCESS_ENGINEER', label: 'Process Engineer', category: 'CHEMICAL' },
    { value: 'PETROLEUM_ENGINEER', label: 'Petroleum Engineer', category: 'CHEMICAL' },
    { value: 'PETROCHEMICAL_ENGINEER', label: 'Petrochemical Engineer', category: 'CHEMICAL' },
    { value: 'BIOCHEMICAL_ENGINEER', label: 'Biochemical Engineer', category: 'CHEMICAL' },
    { value: 'FOOD_PROCESS_ENGINEER', label: 'Food Process Engineer', category: 'CHEMICAL' },

    // Other Engineering
    { value: 'BIOMEDICAL_ENGINEER', label: 'Biomedical Engineer', category: 'OTHER' },
    { value: 'BIOTECHNOLOGY_ENGINEER', label: 'Biotechnology Engineer', category: 'OTHER' },
    { value: 'AGRICULTURAL_ENGINEER', label: 'Agricultural Engineer', category: 'OTHER' },
    { value: 'MARINE_ENGINEER', label: 'Marine Engineer', category: 'OTHER' },
    { value: 'NUCLEAR_ENGINEER', label: 'Nuclear Engineer', category: 'OTHER' },
    { value: 'MINING_ENGINEER', label: 'Mining Engineer', category: 'OTHER' },
    { value: 'MATERIALS_ENGINEER', label: 'Materials Engineer', category: 'OTHER' },
    { value: 'METALLURGICAL_ENGINEER', label: 'Metallurgical Engineer', category: 'OTHER' },
    { value: 'TEXTILE_ENGINEER', label: 'Textile Engineer', category: 'OTHER' },

    // Academic & Management
    { value: 'ENGINEERING_STUDENT', label: 'Engineering Student', category: 'ACADEMIC' },
    { value: 'RESEARCH_ENGINEER', label: 'Research Engineer', category: 'ACADEMIC' },
    { value: 'ENGINEERING_RESEARCHER', label: 'Engineering Researcher', category: 'ACADEMIC' },
    { value: 'ENGINEERING_PROFESSOR', label: 'Engineering Professor', category: 'ACADEMIC' },
    { value: 'ENGINEERING_LECTURER', label: 'Engineering Lecturer', category: 'ACADEMIC' },
    { value: 'PROJECT_ENGINEER', label: 'Project Engineer', category: 'ACADEMIC' },
    { value: 'ENGINEERING_MANAGER', label: 'Engineering Manager', category: 'ACADEMIC' },
    { value: 'CONSULTANT_ENGINEER', label: 'Consultant Engineer', category: 'ACADEMIC' },

    // Other
    { value: 'OTHER', label: 'Other', category: 'ACADEMIC' },
];

// Popular roles shown initially
export const POPULAR_ROLE_IDS = [
    'SOFTWARE_ENGINEER',
    'FULL_STACK_DEVELOPER',
    'BACKEND_ENGINEER',
    'FRONTEND_DEVELOPER',
    'WEB_DEVELOPER',
    'MECHANICAL_ENGINEER',
    'CIVIL_ENGINEER',
    'ELECTRICAL_ENGINEER',
    'ENGINEERING_STUDENT',
];

