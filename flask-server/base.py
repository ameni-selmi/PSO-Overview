from flask import Flask
# Import modules
import numpy as np
import json
# Import PySwarms
import pyswarms as ps
from pyswarms.utils.functions import single_obj as fx
from flask_cors import CORS, cross_origin
from flask import request

# create a parameterized version of the classic Rosenbrock unconstrained optimzation function
# def rosenbrock_with_args(x, a, b, c=0):
#     f = (a - x[:, 0]) ** 2 + b * (x[:, 1] - x[:, 0] ** 2) ** 2 + c
#     return f





api = Flask(__name__)
cors = CORS(api, resources={r"/": {"origins": "*"}})
api.config['CORS_HEADERS'] = 'Content-Type'




@api.route('/send', methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_query_from_react():
    data = json.loads(request.data.decode())
    # print("\n data =\n", data["c1"])
    # Create bounds
    max_bound= 5.12* np.ones(2)
    min_bound = -max_bound
    bounds = (min_bound, max_bound)

    # Set-up hyperparameters
    options = {'c1': float(data["c1"]), 'c2': float(data["c2"]), 'w': float(data["w"])}
    # Call instance of PSO
    optimizer = ps.single.GlobalBestPSO(n_particles= int(data["npart"]), dimensions= int(data["dim"]), options=options) #bounds=bounds
    optimizer_with_handle = ps.single.GlobalBestPSO(n_particles= int(data["npart"]), dimensions= int(data["dim"]), options=options, oh_strategy={"w":'exp_decay', 'c1':'lin_variation'})
    # Call instance of PSO
    #optimizer = ps.single.LocalBestPSO(n_particles=10, dimensions=2, options=options)
    # Perform optimization
    #eval(data["fx"]), type(eval(data["fx"]))
    cost, pos = optimizer.optimize(eval(data["fx"]), iters=int(data["iters"]))
    cost_h, pos_h = optimizer_with_handle.optimize(fx.sphere, iters=int(data["iters"]))
    cost_history =optimizer.cost_history
    cost_h_history=optimizer_with_handle.cost_history
    pos_h_history=optimizer_with_handle.pos_history
    pos_history= optimizer.pos_history
    l=[]
    for i in pos_history :
        for j in i.tolist() :
            l.append(j)
    l_h=[]
    for i in pos_h_history :
        for j in i.tolist() :
            l_h.append(j)
    response_body = {
        "cost": json.dumps(str(cost)),
        "pos" : json.dumps(str(pos)),
        "cost_history" : json.dumps(cost_history),
        "pos_history" : json.dumps(l),
        "cost_h_history": json.dumps(cost_h_history),
        "pos_h_history" : json.dumps(l_h),
    }
    return response_body

    

@api.route('/circuit', methods = ['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_from_react():
    # data = json.loads(request.data.decode())
    # Set-up hyperparameters
    options = {'c1': 0.5, 'c2': 0.3, 'w':0.3}
    # Call instance of PSO
    optimizer = ps.single.GlobalBestPSO(n_particles= 10 , dimensions= 1, options=options) #bounds=bounds
    def cost_function(I):
         #Fixed parameters
        U = 10
        R = 100
        I_s = 9.4e-12
        v_t = 25.85e-3
        c = abs(U - v_t * np.log(abs(I[:, 0] / I_s)) - R * I[:, 0])
        return c

    cost, pos = optimizer.optimize(cost_function, iters=30 )
    x = np.linspace(0.001, 0.1, 100).reshape(100, 1)
    y = cost_function(x).tolist()
    response_body = {
        "cost": json.dumps(str(cost)),
        "pos" : json.dumps(str(pos[0])),
        "x" : json.dumps(np.linspace(0.001, 0.1, 100).tolist()) ,
        "y" : json.dumps(y),
    }
    return response_body
