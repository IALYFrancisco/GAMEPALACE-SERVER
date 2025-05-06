export function corsAuthorization(request, response, next){
    response.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN)
    response.setHeader('Access-Control-Allow-Method', 'POST')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.setHeader('Access-Control-Allow-Credentials', true)
    next()
}