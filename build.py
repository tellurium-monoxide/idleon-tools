from complexity.prep import prompt_and_delete_cruft
from complexity.main import complexity
from complexity.serve import serve_static_site

import os
import sys
import shutil

mydir = 'www/'

# Try to remove the tree; if it fails, throw an error using try...except.
print("Try to delete build destination if it exists")
try:
    shutil.rmtree(mydir)
except OSError as e:
    print("%s does not exist, no need to delete." % (e.filename))
    

complexity('project/', 'www/')
# serve_static_site('www/')

