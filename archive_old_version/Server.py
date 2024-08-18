# -*- coding: utf-8 -*-
#test on python 3.4 ,python of lower version has different module organization.
import http.server


PORT = 8000


def run():
    Handler = http.server.SimpleHTTPRequestHandler
    
    Handler.extensions_map={
            '.manifest': 'text/cache-manifest',
            '.html': 'text/html',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.svg': 'image/svg+xml',
            '.css': 'text/css',
            # '.js':  'application/x-javascript',
            '.js':  'application/javascript',
            '': 'application/octet-stream', # Default
        }
    
    with http.server.HTTPServer(("", PORT), Handler) as httpd:
        print("serving at port", PORT)
        print("address", httpd.server_name)
        httpd.serve_forever()




if __name__ == '__main__':
    run()
