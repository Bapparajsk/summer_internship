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