export type QuizData = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
};

export const QUIZ_DATA: QuizData[] = [
    {
        id: '1',
        question: 'Which SQL statement is used to retrieve data from a database?',
        options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
        correctAnswer: 0,
    },
    {
        id: '2',
        question: 'Which clause is used to filter records?',
        options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
        correctAnswer: 2,
    },
    {
        id: '3',
        question: 'Which SQL statement is used to insert new data?',
        options: ['ADD', 'INSERT INTO', 'CREATE', 'UPDATE'],
        correctAnswer: 1,
    },
    {
        id: '4',
        question: 'Which command removes a table and all its data?',
        options: ['DELETE', 'REMOVE', 'DROP', 'TRUNCATE'],
        correctAnswer: 2,
    },
    {
        id: '5',
        question: 'Which JOIN returns all matching rows from both tables?',
        options: ['LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'INNER JOIN'],
        correctAnswer: 2,
    },
    {
        id: '6',
        question: 'Which key uniquely identifies a record?',
        options: ['Foreign Key', 'Candidate Key', 'Primary Key', 'Composite Key'],
        correctAnswer: 2,
    },
    {
        id: '7',
        question: 'What does DBMS stand for?',
        options: [
            'Database Management System',
            'Data Backup Management System',
            'Database Monitoring Service',
            'Data Base Machine System',
        ],
        correctAnswer: 0,
    },
    {
        id: '8',
        question: 'Normalization reduces?',
        options: [
            'Data redundancy',
            'Storage size',
            'Network traffic',
            'CPU usage',
        ],
        correctAnswer: 0,
    },
    {
        id: '9',
        question: 'Which normal form removes partial dependency?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: 1,
    },
    {
        id: '10',
        question: 'ACID stands forcorrectAnswer?',
        options: [
            'Atomicity, Consistency, Isolation, Durability',
            'Accuracy, Consistency, Integrity, Durability',
            'Atomicity, Control, Isolation, Durability',
            'Atomicity, Consistency, Integrity, Dependency',
        ],
        correctAnswer: 0,
    },
];
