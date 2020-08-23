const http = require('http') // For creating an HTTP server
// const https = require('https') // For creating an HTTPS server (capability will be added later)
const fs = require('fs') // For reading files from the server filesystem
const os = require('os') // For retrieving operating system information (for error pages)
const path = require('path') // For manipulating request paths
const mimeTypes = require('mime-types') // For sending the correct Content-Type HTTP header

const errorPage = fs.readFileSync('../../defaults/errors/404.html', 'utf8') // Default error page content
const logo = fs.readFileSync('../../logo.svg', 'utf8')

function serverHandler (req, res) {
  let filename = path.join(__dirname, '..', '..', '..', path.normalize(req.url))
  const mimetype = mimeTypes.lookup(filename)
  const reqURLArray = req.url.split('/')
  if (reqURLArray[1] === 'aluminum-internals') {
    switch (reqURLArray[2]) {
      case 'logo.svg':
        res.writeHead(200, { 'Content-Type': 'image/svg+xml' })
        res.write(logo)
        return res.end()
      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('404 ERROR | NOT FOUND' +
          os.EOL +
          os.EOL +
          'The requested internal Aluminum resource, ' +
          reqURLArray.slice(2).join('/') +
          ', does not exist. Please check the request URL.' +
          os.EOL +
          'Please note that if you have files in a directory named aluminum-internals, then they will not be served. ' +
          'The URL /aluminum-internals is reserved for AluminumJS internal resources.'
        )
        return res.end()
    }
  }
  if (reqURLArray[reqURLArray.length - 1] === '') {
    filename += 'index.html'
  }
  fs.readFile(filename, function (err, data) {
    if (err) {
      let adjustedReqURL = req.url
      if (reqURLArray[reqURLArray.length - 1] === '') {
        adjustedReqURL += 'index.html'
      }
      res.writeHead(404, { 'Content-Type': 'html' })
      res.write(
        errorPage
          .replace(/\$requrl\$/g, req.url)
          .replace(/\$adjrequrl\$/g, adjustedReqURL)
          .replace(/\$osplatform\$/g, os.platform())
          .replace(/\$ostype\$/g, os.type())
          .replace(/\$osversion\$/g, os.release())
          .replace(/\$port\$/g, '80')
          .replace(/\$errcode\$/, err.code)
          .replace(/\$errno\$/, err.errno.toString())
          .replace(/\$errmessage\$/, err.message)
      )
      return res.end()
    }
    res.writeHead(200, { 'Content-Type': mimetype })
    res.write(data)
    return res.end()
  }
  )
}

const server = http.createServer(serverHandler)
server.listen(80)
