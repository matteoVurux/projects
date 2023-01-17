let getRepositoryTokenMock = (data: unknown[]) => {
    return {
        find: jest.fn().mockReturnValue(data),
        findOne: jest.fn().mockReturnValue(data[0]),
        findOneBy: jest.fn().mockReturnValue(data[0]),
        findOneOrFail: jest.fn().mockReturnValue(data[0]),
        findOneByOrFail: jest.fn().mockReturnValue(data[0]),
        findAndCount: jest.fn().mockReturnValue([data, data.length]),
        create: jest.fn(),
        save: jest.fn(),
        remove: jest.fn(),
        insert: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        createQueryBuilder: jest.fn(() => ({
            delete: jest.fn().mockReturnThis(),
            from: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            execute: jest.fn().mockReturnThis(),
            leftJoin: jest.fn().mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            innerJoin: jest.fn().mockReturnThis(),
            innerJoinAndSelect: jest.fn().mockReturnThis(),
            addOrderBy: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockReturnValue(data)
        })),
    }
}

export { getRepositoryTokenMock as getRepositoryTokenMock }
