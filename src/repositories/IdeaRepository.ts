import { IdeaProps } from "../interfaces/Idea";

export const IdeaRepository = {
  getAll: async () => {
    const commentFactory = (createdAt) => (
      {
        id: Math.floor(Math.random() * 1000000),
        author: { id: Math.floor(Math.random() * 1000000), avatar: '', name: 'Guilherme' },
        content: 'hi its good',
        createdAt
      }
    );

    const ideaFactory = (statusId: number) => (
      { 
        id: Math.floor(Math.random() * 1000000),
        title: '[Lorem] Lorem Ipsum 🚀',
        description: 'Welcome to Frill, your new Feedback, Roadmap and Announcements tool.\nRead through a few of these cards and get acquainted with the interface.\nStart by taking a look at your Roadmap in the main menu and clicking around some of the example idea.',
        author: { id: Math.floor(Math.random() * 1000000), avatar: '', name: 'Mike H' },
        topics: [{ id: 1, name: 'Loremipsum 👋' }, { id: 2, name: 'Lorem ipsum 🔗' }], 
        status: { id: statusId },
        voteCount: Math.floor(Math.random() * 10),
        comments: [commentFactory('2022-07-20T21:49:41.000000Z')],
        commentCount: Math.floor(Math.random() * 10),
        createdAt: '2022-07-07T21:49:41.000000Z'
      } as IdeaProps
    );

    return [
      ideaFactory(1),
      ideaFactory(1),
      ideaFactory(1),
      ideaFactory(2),
      ideaFactory(2),
      ideaFactory(3),
      ideaFactory(4)
    ];
  }
};
