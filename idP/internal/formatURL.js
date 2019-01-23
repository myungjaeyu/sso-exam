const url = require('url')

module.exports = formatURL = (token, redirect_url) => {

    const _url = url.parse(redirect_url)
    const pathname = `${ _url.protocol }//${ _url.host }/auth/sso`

    return url.format({pathname, query: { token, redirect_url }})
}