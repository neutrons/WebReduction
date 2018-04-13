from __future__ import print_function
from datetime import datetime
import numpy as np
import time

'''
Script generation for reduction
Title: {{ title}}
User: {{ user }}
Intrument: {{instrument_name}}
IPTS Number: {{ipts_number}}
'''

current_time = datetime.now().strftime("%Y%m%d_%H%M%S%s")
filename = "plot_{}.txt".format(current_time)
with open(filename, "w") as f:
    f.write("# X , Y , E , DX\n")
    f.write("1\n")
    for i in range(50):
        v = i/10.0
        line = "{:.2f}, {:.2f}, {:.2f}, {:.2f}".format(
            v, np.exp(v), np.sqrt(np.exp(v)), np.sqrt(v))
        print(current_time + " :: " + line)
        f.write(line + '\n')
        time.sleep(0.1)
