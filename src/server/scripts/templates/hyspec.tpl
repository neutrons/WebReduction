from __future__ import print_function
from datetime import datetime
import time

'''
Script generation for reduction
Title: {{ title}}
User: {{ user }}
Intrument: {{instrument_name}}
IPTS Number: {{ipts_number}}
'''

with open("hyspec.log", "w") as f:
    for i in range(100):
        current_time = datetime.now()
        line = "line number {} at {}".format(i, str(current_time))
        print(line)
        f.write(line + '\n')
        time.sleep(0.1)
