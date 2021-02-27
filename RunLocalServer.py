#Use to create local host
import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
        ".js": "application/javascript",
});

httpd = socketserver.TCPServer(("", PORT), Handler)
print("running server on localhost:"+str(PORT))
httpd.serve_forever()