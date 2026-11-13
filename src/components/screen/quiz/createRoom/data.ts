
export type Category = {
    id: string;
    label: string;
    subjects: string[];
};


export const CATEGORIES: Category[] = [
    {
        id: 'programming',
        label: 'Programming',
        subjects: [
            'C++ Programming',
            'Algorithms',
            'Data Structures',
            'React & Web',
            'Operating Systems',
            'Computer Networks',
        ],
    },
    {
        id: 'computer-science',
        label: 'Computer Science',
        subjects: [
            'Operating Systems',
            'Computer Networks',
            'Database Systems',
            'Computer Architecture',
            'Compiler Design',
        ],
    },
    {
        id: 'mathematics',
        label: 'Mathematics',
        subjects: [
            'Algebra',
            'Calculus',
            'Probability',
            'Statistics',
            'Discrete Mathematics',
        ],
    },
    {
        id: 'science',
        label: 'Science',
        subjects: [
            'Physics',
            'Chemistry',
            'Biology',
            'Astronomy',
        ],
    },
    {
        id: 'general',
        label: 'General Knowledge',
        subjects: [
            'History',
            'Geography',
            'Current Affairs',
            'Culture',
        ],
    },
];