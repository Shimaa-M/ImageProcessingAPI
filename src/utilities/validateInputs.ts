import { queryParams } from '../DTO/params.dto';

const validateParams = (params:queryParams) : boolean => {
    const isEmpty =  Object.values(params).includes('');
    return isEmpty;
    };

export default validateParams;   