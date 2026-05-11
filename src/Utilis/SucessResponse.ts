
export interface IResponse <T=any> {
    message: string,
    statusCode?: number,
    data?: T
}


export const SuccessResponse  = <T=any> ({
    message = "Done",
    statusCode = 200,
    data
}:IResponse<T>):IResponse<T> => {
    return {
        message,
        statusCode,
        data
    }
}