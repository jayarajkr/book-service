
import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaResponse } from './types/types';


export const handler = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    return {
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify('Success..'),
    }
};

