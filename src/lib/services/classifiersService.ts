import create from '@/lib/services/httpService';

const classifiersService = create('/classifiers');

export interface ClassifiersData {
    productGroups: string[];
    brands: string[];
    colors: string[];
    priceIntervals: string[];
}

export const getAllClassifiers = async (): Promise<ClassifiersData> => {
    const { request } = classifiersService.getAll<ClassifiersData>();
    const response = await request;
    return Array.isArray(response.data) ? response.data[0] : response.data;
};

export default classifiersService;
