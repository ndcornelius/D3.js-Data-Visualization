import math

print("t,sin,cos")

for x in range(50000):
    print(str(x*0.001) + "," + str(math.sin(x*2*math.pi/1000)) + "," + str(math.cos(x*2*math.pi/1000)))
    