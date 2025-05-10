
//Hanler to catch errors in async functions
//it provide the functionality to cathc error function & we dont need to write try cathc block
const asyncHandler = (fxn) => {
    return (req, res, next) =>{
            Promise.resolve( fxn(req, res, next)).catch( (error)=>{ next(error) })
        }
    }
    
module.exports =  asyncHandler;
    
    