export type QuizOption = {
    id: string;
    option: string;
};

export type QuizData = {
    id: string;
    question: string;
    options: QuizOption[];
    correctAnswer: QuizOption["id"];
};

const createOptions = (options: string[]): QuizOption[] =>
    options.map((option, index) => ({
        id: String.fromCharCode(97 + index),
        option,
    }));

export const QUIZ_DATA: QuizData[] = [
    {
        id: '1',
        question: 'Which SQL statement is used to retrieve data from a database?',
        options: createOptions(['SELECT', 'INSERT', 'UPDATE', 'DELETE']),
        correctAnswer: 'a',
    },
    {
        id: '2',
        question: 'Which clause is used to filter records?',
        options: createOptions(['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING']),
        correctAnswer: 'c',
    },
    {
        id: '3',
        question: 'Which SQL statement is used to insert new data?',
        options: createOptions(['ADD', 'INSERT INTO', 'CREATE', 'UPDATE']),
        correctAnswer: 'b',
    },
    {
        id: '4',
        question: 'Which command removes a table and all its data?',
        options: createOptions(['DELETE', 'REMOVE', 'DROP', 'TRUNCATE']),
        correctAnswer: 'c',
    },
    {
        id: '5',
        question: 'Which JOIN returns all matching rows from both tables?',
        options: createOptions(['LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'INNER JOIN']),
        correctAnswer: 'd',
    },
    {
        id: '6',
        question: 'Which key uniquely identifies a record?',
        options: createOptions(['Foreign Key', 'Candidate Key', 'Primary Key', 'Composite Key']),
        correctAnswer: 'c',
    },
    {
        id: '7',
        question: 'What does DBMS stand for?',
        options: createOptions([
            'Database Management System',
            'Data Backup Management System',
            'Database Monitoring Service',
            'Data Base Machine System',
        ]),
        correctAnswer: 'a',
    },
    {
        id: '8',
        question: 'Normalization reduces?',
        options: createOptions([
            'Data redundancy',
            'Storage size',
            'Network traffic',
            'CPU usage',
        ]),
        correctAnswer: 'a',
    },
    {
        id: '9',
        question: 'Which normal form removes partial dependency?',
        options: createOptions(['1NF', '2NF', '3NF', 'BCNF']),
        correctAnswer: 'b',
    },
    {
        id: '10',
        question: 'What does ACID stand for?',
        options: createOptions([
            'Atomicity, Consistency, Isolation, Durability',
            'Accuracy, Consistency, Integrity, Durability',
            'Atomicity, Control, Isolation, Durability',
            'Atomicity, Consistency, Integrity, Dependency',
        ]),
        correctAnswer: 'a',
    },
];