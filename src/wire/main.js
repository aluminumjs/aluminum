const http = require('http') // For creating an HTTP server
// const https = require('https') // For creating an HTTPS server (capability will be added later)
const fs = require('fs') // For reading files from the server filesystem
const os = require('os') // For retrieving operating system information (for error pages)
const path = require('path') // For manipulating request paths
const mimeTypes = require('mime-types') // For sending the correct Content-Type HTTP header

const ports = JSON.parse(fs.readFileSync('../../usr/prefs/listen.json', 'utf8')).wire
const preferences = JSON.parse(fs.readFileSync('../../usr/prefs/wire.json', 'utf8'))

const logo = fs.readFileSync('../../logo.svg', 'utf8')

function resolveErrorPage (path, encoding) {
  const resolution = {}
  resolution.mimeType = mimeTypes.lookup(path)
  if (resolution.mimeType.split('/')[0] === 'text') {
    resolution.text = true
    resolution.content = fs.readFileSync(path, encoding)
  } else {
    resolution.text = false
    resolution.content = fs.readFileSync(path)
  }
  return resolution
}

const errorPage = {
  notFound: resolveErrorPage(preferences.errorPages.notFound.URI, preferences.errorPages.notFound.encoding),
  serverError: resolveErrorPage(preferences.errorPages.serverError.URI, preferences.errorPages.serverError.encoding)
}

function serverHandler (req, res) {
  let filename = path.join(__dirname, '..', '..', 'usr', 'resources', 'wire', 'serve', path.normalize(req.url))
  const reqURLArray = req.url.split('/')
  if (reqURLArray[1] === 'aluminum-internals') {
    switch (reqURLArray[2]) {
      case 'logo.svg':
        res.writeHead(200, { Server: 'Aluminum Wire', 'Content-Type': 'image/svg+xml' })
        res.write(logo)
        return res.end()
      default:
        res.writeHead(404, { Server: 'Aluminum Wire', 'Content-Type': 'text/plain' })
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
  if (preferences.indexRedirect && reqURLArray[reqURLArray.length - 1] === '') {
    filename += 'index.html'
  }
  const mimetype = mimeTypes.lookup(filename)
  fs.readFile(filename, function (readErr, data) {
    if (readErr) {
      let adjustedReqURL = req.url
      if (preferences.indexRedirect && reqURLArray[reqURLArray.length - 1] === '') {
        adjustedReqURL += 'index.html'
      }
      res.writeHead(404, { Server: 'Aluminum Wire', 'Content-Type': errorPage.notFound.mimeType })
      if (errorPage.notFound.text) {
        res.write(
          errorPage.notFound.content
            .replace(/\$requrl\$/g, req.url)
            .replace(/\$adjrequrl\$/g, adjustedReqURL)
            .replace(/\$osplatform\$/g, os.platform())
            .replace(/\$ostype\$/g, os.type())
            .replace(/\$osversion\$/g, os.release())
            .replace(/\$port\$/g, ports.HTTP.toString())
            .replace(/\$errcode\$/g, readErr.code)
            .replace(/\$errno\$/g, readErr.errno.toString())
            .replace(/\$errmessage\$/g, readErr.message)
        )
      } else {
        res.write(errorPage.notFound.content)
      }
      return res.end()
    }
    fs.stat(filename, function (statErr, stats) {
      if (statErr) {
        res.writeHead(500, { Server: 'Aluminum Wire', 'Content-Type': errorPage.serverError.mimeType })
        if (errorPage.serverError.text) {
          res.write(
            errorPage.serverError.content
              .replace(/\$requrl\$/g, req.url)
              .replace(/\$osplatform\$/g, os.platform())
              .replace(/\$ostype\$/g, os.type())
              .replace(/\$osversion\$/g, os.release())
              .replace(/\$port\$/g, ports.HTTP.toString())
              .replace(/\$errcode\$/g, statErr.code)
              .replace(/\$errno\$/, statErr.errno.toString())
              .replace(/\$errmessage\$/g, statErr.message)
          )
        } else {
          res.write(errorPage.serverError.content)
        }
        return res.end()
      }
      if (typeof req.headers['if-modified-since'] === 'undefined' || (Math.trunc((stats.mtime.getTime()) / 1000) > Math.trunc((new Date(req.headers['if-modified-since']).getTime()) / 1000))) {
        res.writeHead(200, { Server: 'Aluminum Wire', 'Content-Type': mimetype, 'Last-Modified': stats.mtime.toUTCString() })
        res.write(data)
        return res.end()
      }
      res.writeHead(304, { Server: 'Aluminum Wire' })
      return res.end()
    }
    )
  }
  )
}

const server = http.createServer(serverHandler)
server.listen(ports.HTTP)
