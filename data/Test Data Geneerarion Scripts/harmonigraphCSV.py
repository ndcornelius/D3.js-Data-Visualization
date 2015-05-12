import math

a1 = 1
a2 = 1
a3 = 1
a4 = 1
a5 = 1
a6 = 1
f1 = 1
f2 = 3
f3 = 1
f4 = 3
f5 = 1
f6 = 3
p1 = math.pi/6
p2 = math.pi
p3 = math.pi/2
p4 = 3*math.pi/2
p5 = 2*math.pi
p6 = math.pi/4
d1 = 0.004
d2 = 0.0065
d3 = 0.01
d4 = 0.001
d5 = 0.005
d6 = 0.0075


print("x,y,z")

for i in range(5000):
    t = i*0.01
    x = a1 * math.sin(t * f1 + p1)*math.e**(-d1*t) + a2 * math.sin(t * f2 + p2)*math.e**(-d2*t)
    y = a3 * math.sin(t * f3 + p3)*math.e**(-d3*t) + a4 * math.sin(t * f4 + p4)*math.e**(-d4*t)
    z = a5 * math.sin(t * f5 + p5)*math.e**(-d5*t) + a6 * math.sin(t * f6 + p6)*math.e**(-d6*t)
    print(str(x) + "," + str(y) + "," + str(z))
    