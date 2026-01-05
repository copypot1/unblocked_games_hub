export interface Game {
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
    category: string;
}

export const games: Game[] = [
    {
        id: '1',
        title: '2048',
        url: 'https://play2048.co/',
        category: 'Puzzle'
    },
    {
        id: '2',
        title: 'Cookie Clicker',
        url: 'https://orteil.dashnet.org/cookieclicker/',
        category: 'Clicker'
    },
    {
        id: '3',
        title: 'Tetris',
        url: 'https://tetris.com/play-tetris',
        category: 'Arcade'
    },
    {
        id: '4',
        title: 'Slow Roads',
        url: 'https://slowroads.io/',
        category: 'Driving'
    },
    {
        id: '5',
        title: 'Minecraft Classic',
        url: 'https://classic.minecraft.net/',
        category: 'Sandbox'
    }
];
