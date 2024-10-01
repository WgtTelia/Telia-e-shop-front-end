import axios, { CanceledError } from 'axios';

export default axios.create({
    baseURL: 'https://henrika.eu-central-1.elasticbeanstalk.com/api/',
});

export { CanceledError };
