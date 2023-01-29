import { CategoryProps } from "../interfaces/Category";

export const CategoryRepository = {
  getAll: async () => {
    const categoryFactory = (id: number, color: string) => ({ id, name: 'Lorem ipsum', color } as CategoryProps);
    
    return [
      categoryFactory(1, '#ff3c3c'), 
      categoryFactory(2, '#3c3cdd'), 
      categoryFactory(3, '#dd4f'), 
      categoryFactory(4, '#6392d9')
    ];
  }
};
