import { StatusProps } from "../interfaces/Status";

export const StatusRepository = {
    getAll: async () => {
        const statusFactory = (id: number, color: string) => ({ id, name: 'Lorem ipsum', color } as StatusProps);

        return [
            statusFactory(1, '#63C8D9'), 
            statusFactory(2, '#eb765d'), 
            statusFactory(3, '#dd4f'), 
            statusFactory(4, '#6392d9')
        ];
    }
};
