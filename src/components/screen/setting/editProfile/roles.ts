export type SelectOption = {
    value: string;
    label: string;
};


// --------------------------------------------------
// Engineering Roles
// --------------------------------------------------

export const ENGINEERING_ROLES: SelectOption[] = [
    // Software & IT
    { value: 'SOFTWARE_ENGINEER', label: 'Software Engineer' },
    { value: 'FULL_STACK_DEVELOPER', label: 'Full Stack Developer' },
    { value: 'FRONTEND_DEVELOPER', label: 'Frontend Developer' },
    { value: 'BACKEND_DEVELOPER', label: 'Backend Developer' },
    { value: 'MOBILE_APP_DEVELOPER', label: 'Mobile App Developer' },
    { value: 'DEVOPS_ENGINEER', label: 'DevOps Engineer' },
    { value: 'DATA_SCIENTIST', label: 'Data Scientist' },
    { value: 'AI_ML_ENGINEER', label: 'AI / ML Engineer' },
    { value: 'CYBERSECURITY_ENGINEER', label: 'Cybersecurity Engineer' },

    // Mechanical
    { value: 'MECHANICAL_ENGINEER', label: 'Mechanical Engineer' },
    { value: 'AUTOMOTIVE_ENGINEER', label: 'Automotive Engineer' },
    { value: 'PRODUCTION_ENGINEER', label: 'Production Engineer' },
    { value: 'ROBOTICS_ENGINEER', label: 'Robotics Engineer' },

    // Civil
    { value: 'CIVIL_ENGINEER', label: 'Civil Engineer' },
    { value: 'STRUCTURAL_ENGINEER', label: 'Structural Engineer' },
    { value: 'CONSTRUCTION_ENGINEER', label: 'Construction Engineer' },

    // Electrical & Electronics
    { value: 'ELECTRICAL_ENGINEER', label: 'Electrical Engineer' },
    { value: 'ELECTRONICS_ENGINEER', label: 'Electronics Engineer' },
    { value: 'VLSI_ENGINEER', label: 'VLSI Engineer' },
    { value: 'AUTOMATION_ENGINEER', label: 'Automation Engineer' },

    // Chemical & Other
    { value: 'CHEMICAL_ENGINEER', label: 'Chemical Engineer', },
    { value: 'BIOMEDICAL_ENGINEER', label: 'Biomedical Engineer', },

    // Academic & Other
    { value: 'ENGINEERING_STUDENT', label: 'Engineering Student' },
    { value: 'RESEARCHER', label: 'Researcher' },
    { value: 'ENGINEERING_MANAGER', label: 'Engineering Manager' },
    { value: 'OTHER', label: 'Other' },
];



export const ENGINEERING_COURSES: SelectOption[] = [
    // Computer Science & IT
    { value: 'COMPUTER_SCIENCE', label: 'Computer Science Engineering' },
    { value: 'INFORMATION_TECHNOLOGY', label: 'Information Technology' },
    { value: 'AI_DATA_SCIENCE', label: 'AI & Data Science' },
    { value: 'CYBER_SECURITY', label: 'Cyber Security' },
    { value: 'SOFTWARE_ENGINEERING', label: 'Software Engineering' },

    // Mechanical
    { value: 'MECHANICAL', label: 'Mechanical Engineering' },
    { value: 'AUTOMOBILE', label: 'Automobile Engineering' },
    { value: 'MECHATRONICS', label: 'Mechatronics Engineering' },
    { value: 'PRODUCTION', label: 'Production Engineering' },

    // Civil
    { value: 'CIVIL', label: 'Civil Engineering' },
    { value: 'ARCHITECTURE', label: 'Architecture' },

    // Electrical & Electronics
    { value: 'ELECTRICAL', label: 'Electrical Engineering' },
    { value: 'ELECTRONICS', label: 'Electronics Engineering' },
    { value: 'ECE', label: 'Electronics & Communication Engineering' },
    { value: 'EEE', label: 'Electrical & Electronics Engineering' },
    { value: 'VLSI', label: 'VLSI Design' },

    // Chemical & Biotechnology
    { value: 'CHEMICAL', label: 'Chemical Engineering' },
    { value: 'BIOTECHNOLOGY', label: 'Biotechnology' },
    { value: 'BIOMEDICAL', label: 'Biomedical Engineering' },

    // Other Engineering
    { value: 'AERONAUTICAL', label: 'Aeronautical Engineering' },
    { value: 'AEROSPACE', label: 'Aerospace Engineering' },
    { value: 'AGRICULTURAL', label: 'Agricultural Engineering' },
    { value: 'MARINE', label: 'Marine Engineering' },

    // Other
    { value: 'DIPLOMA_ENGINEERING', label: 'Diploma Engineering' },
    { value: 'OTHER', label: 'Other' },
];