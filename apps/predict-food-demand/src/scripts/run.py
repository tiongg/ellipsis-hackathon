from subprocess import run 

def dev():
    run(['uvicorn', 'main:app', '--port', '8000', '--reload' ])