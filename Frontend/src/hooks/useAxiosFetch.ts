import { useState, useEffect } from "react";
import axios from 'axios';
import { Page } from 'types/Page';

/*
export const useAxiosFetchArray = (dataUrl: string) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url: string) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });

                if (isMounted) {
                    setData(response.data);
                    setFetchError(null)
                }
            } catch (err: any) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setTimeout(() => setIsLoading(false), 2000);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log('clean up function')
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}
*/

export const useAxiosFetchById = (dataUrl: string) => {
    const [data, setData] = useState({});
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url: string) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });

                if (isMounted) {
                    setData(response.data);
                    setFetchError(null)
                }
            } catch (err: any) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData({});
                }
            } finally {
                isMounted && setTimeout(() => setIsLoading(false), 2000);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log('clean up function')
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}

export const useAxiosFetchPage = (dataUrl: string) => {

    const [data, setData] = useState<Page>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url: string) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });

                if (isMounted) {
                    setData(response.data);
                    setFetchError(null)
                }
            } catch (err: any) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData({
                        content: [],
                        first: true,
                        last: true,
                        number: 0,
                        totalElements: 0,
                        totalPages: 0
                    });
                }
            } finally {
                isMounted && setTimeout(() => setIsLoading(false), 500);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log('clean up function')
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}



