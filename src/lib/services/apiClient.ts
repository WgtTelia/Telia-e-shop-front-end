import axios, { CanceledError } from 'axios';

export default axios.create({
    baseURL: 'http://henrika.eu-central-1.elasticbeanstalk.com/api/',
});

export { CanceledError };
