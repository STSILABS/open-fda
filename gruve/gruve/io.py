import os
import sys
import csv

def relativeToAbsolute(path):
    # where is this script?
    thisScriptDir = os.path.dirname(__file__)

    # get the expected paths
    return os.path.join(thisScriptDir, path)

# -----------------------------------------------------------------------------

def apiKeys():
    '''
    Generator for the list of keys in the .env file
    '''
    envFileName = relativeToAbsolute(r'../../.env')
    if not os.path.exists(envFileName):
        print("ENV file '%s' not found." % envFileName, file=sys.stderr)
        raise FileNotFoundError()

    # get the keys
    with open(envFileName, 'r') as f:
        for line in f:
            k, v = line.strip().split('=', 1)
            if k[0] != '#':
                yield (k,v)

def getApiKey(name):
    '''
    Gets the one (and only!) api key with `name`
    '''
    keys = [v for k,v in apiKeys() if k == name]
    assert len(keys) > 0
    assert len(keys) == 1
    return keys[0]

# -----------------------------------------------------------------------------

def saveAsTabbedText(iterator, relativeFileName):
    '''
    The rows of `iterator` are saved to `relativeFileName`
    Note: `csv.DictWriter` is not used because it outputs too many newlines
    Also, this allows for changing to write in Unicode format, which `DictWriter`
    does not handle well.
    '''
    outFileName = relativeToAbsolute(relativeFileName)
    columns = []

    # output the join as it processes
    with open(outFileName, 'w') as f:
        for row in iterator:
            if not columns:
                columns = sorted(row.keys())
                print('\t'.join(columns), file=f)

            for col in columns:
                print(row[col] if col in row else '', end='\t', file=f)
            print('', file=f)