import { TopicProps } from "../interfaces/Topic";

export const TopicRepository = {
    getAll: async () => {
        return [
            { id: 1, name: 'Loremipsum 👋' }, 
            { id: 2, name: 'Lorem ipsum 🔗' },
            { id: 3, name: 'Lorem 🎨' },
            { id: 4, name: 'Lorem' },
            { id: 5, name: 'Lorem' },
            { id: 6, name: 'Lorem' },
            { id: 7, name: 'Lorem' }
        ] as TopicProps[];
    }
};
