class apiError extends Error{
    constructor(
        statuscode,
        message="Something went wrong",
        stack="",
        errors=[]
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message= message
        this.errors= errors
        this.succeess= false

        if(stack){
            this.stack= stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {apiError}