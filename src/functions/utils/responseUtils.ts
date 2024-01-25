import { LambdaResponse } from "../types/types";

export class ResponseUtils{
    public static async buildResponse(statusCode: number, body: any): Promise<LambdaResponse> {
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: statusCode,
            body: JSON.stringify(body),
        }
    }
}