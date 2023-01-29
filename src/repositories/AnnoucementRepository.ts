import { AnnoucementProps } from "../interfaces/Annoucement";

export const AnnoucementRepository = {
  getAll: async () => {
    const annoucementFactory = () => (
      { 
        id: Math.floor(Math.random() * 1000000),
        title: '[Lorem] Lorem Ipsum 🚀',
        description: 'Welcome to Frill, your new Feedback, Roadmap and Announcements tool.\nRead through a few of these cards and get acquainted with the interface.\nStart by taking a look at your Roadmap in the main menu and clicking around some of the example idea. Welcome to Frill, your new Feedback, Roadmap and Announcements tool. Read through a few of these cards and get acquainted with the interface. Start by taking a look at your Roadmap in the main menu and clicking around some of the example idea.',
        cover: 'https://images.pexels.com/photos/3473411/pexels-photo-3473411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        categories: [{ id: 1, name: 'Lorem ipsum', color: '#ff3c3c' }, { id: 2, name: 'Lorem ipsum', color: '#3c3cdd' }],
        createdAt: '2022-07-07T21:49:41.000000Z'
      } as AnnoucementProps
    );

    return [annoucementFactory()];
  }
};
