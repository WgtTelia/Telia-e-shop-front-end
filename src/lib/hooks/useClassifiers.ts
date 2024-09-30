// import { useEffect, useState } from 'react';
// import { getAllClassifiers } from '@/lib/services/classifiersService';

// export const useClassifiers = () => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);
//     const [classifiers, setClassifiers] = useState([]);

//     useEffect(() => {
//         let isMounted = true;
//         const fetchClassifiers = async () => {
//             try {
//                 const data = await getAllClassifiers();
//                 if (isMounted) {
//                     setClassifiers(data);
//                 }
//             } catch (error) {
//                 if (isMounted) {
//                     setError(true);
//                     console.error(`Error fetching classifiers`, error);
//                 }
//             } finally {
//                 if (isMounted) {
//                     setLoading(false);
//                 }
//             }
//         };
//         fetchClassifiers();
//         return () => {
//             isMounted = false;
//         };
//     }, []);
//     return {
//         classifiers,
//         loading,
//         error,
//     };
// };
