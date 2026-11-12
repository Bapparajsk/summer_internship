
const romeTopic = [
    "programming", 
    "science",
    "mathematics",
    "history",
    "general"
]

const ROOM_TOPICS: Record<string, string[]> = {
    programming: ['Syntax', 'Code', 'Binary', 'Algorithm', 'Compiler'],
    science: ['Quantum', 'Cosmic', 'Atomic', 'Discovery', 'Nova'],
    mathematics: ['Infinity', 'Matrix', 'Numbers', 'Prime', 'Logic'],
    history: ['Ancient', 'Empire', 'Legends', 'Timeline', 'Heritage'],
    general: ['Trivia', 'Brain', 'Knowledge', 'Mind', 'Wisdom'],
};

const ROOM_TEMPLATES = [
    (topic: string) => `${topic} Showdown`,
    (topic: string) => `The ${topic} Arena`,
    (topic: string) => `${topic} Challenge`,
    (topic: string) => `Beyond ${topic}`,
    (topic: string) => `${topic} League`,
    (topic: string) => `Operation ${topic}`,
];



const MAX_ROOM_NAME_LENGTH = 32;

export function generateRoomName(
    previousNames: string[] = [],
): string {

    const topics = ROOM_TOPICS[romeTopic[Math.min(Math.round(Math.random() * 4), 4)]];

    const used = new Set(
        previousNames.map((name) => name.toLowerCase().trim()),
    );

    const candidates = topics.flatMap((topic) =>
        ROOM_TEMPLATES.map((template) => template(topic)),
    );

    const available = candidates.filter(
        (name) =>
            name.length <= MAX_ROOM_NAME_LENGTH &&
            !used.has(name.toLowerCase()),
    );

    if (available.length === 0) {
        return 'Quiz Battle';
    }

    return available[Math.floor(Math.random() * available.length)];
}
