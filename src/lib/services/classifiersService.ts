import create from '@/lib/services/httpService';
import productService from '@/lib/services/productService';

const classifiersService = create('/classifiers');
///classifiers endpoint doesn't provide productVariants
export interface ClassifiersData {
    productGroups: string[];
    brands: string[];
    colors: string[];
    priceIntervals: string[];
    productVariants: ProductVariant[];
}

export const getAllClassifiers = async (): Promise<ClassifiersData> => {
    const { request: classifiersRequest } =
        classifiersService.getAll<ClassifiersData>();
    const { request: productsRequest } =
        productService.getObject<APIProductData>();

    const [classifiersResponse, productsResponse] = await Promise.all([
        classifiersRequest,
        productsRequest,
    ]);

    const classifiersData = Array.isArray(classifiersResponse.data)
        ? classifiersResponse.data[0]
        : classifiersResponse.data;

    const productVariants = productsResponse.data.content.flatMap(
        (product) => product.productVariants
    );

    return {
        ...classifiersData,
        productVariants,
    };
};

export default classifiersService;
