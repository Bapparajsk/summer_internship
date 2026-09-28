export type QuizTip = {
    id: string;
    topic: string;
    label: string;
    text: string;
    highlight?: string;
};

export const quizTips: QuizTip[] = [
    {
        id: "dsa-1",
        topic: "DSA",
        label: "Quick tip",
        text: "Binary search works in",
        highlight: "O(log n)",
    },
    {
        id: "dsa-2",
        topic: "DSA",
        label: "Remember",
        text: "Red-black tree insertion takes",
        highlight: "O(log n)",
    },
    {
        id: "dsa-3",
        topic: "DSA",
        label: "Quick tip",
        text: "Hash table lookup is",
        highlight: "O(1)",
    },

    {
        id: "cpp-1",
        topic: "C++",
        label: "Quick tip",
        text: "Prefer references when you don't need ownership or copying.",
    },

    {
        id: "java-1",
        topic: "Java",
        label: "Remember",
        text: "String objects are immutable in Java.",
    },

    {
        id: "python-1",
        topic: "Python",
        label: "Quick tip",
        text: "List membership is generally",
        highlight: "O(n)",
    },

    {
        id: "dbms-1",
        topic: "DBMS",
        label: "Remember",
        text: "A database index can significantly reduce lookup cost.",
    },

    {
        id: "os-1",
        topic: "OS",
        label: "Quick tip",
        text: "A process has its own address space, while threads share the process memory.",
    },

    {
        id: "networks-1",
        topic: "Networks",
        label: "Remember",
        text: "TCP provides reliable, ordered delivery of data.",
    },
];