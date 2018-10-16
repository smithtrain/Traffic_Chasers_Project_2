import numpy as np
#import pymysql
#pymysql.install_as_MySQLdb()

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_sqlalchemy import SQLAlchemy



from flask import (
    Flask,
    render_template,
    jsonify,
    request)


#################################################
# Database Setup
#################################################
#engine = create_engine("sqlite:///DB/Traffic_Data_db.sqlite")
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///DB/Traffic_Data_db.sqlite"

db = SQLAlchemy(app)

# reflect an existing database into a new model
#Base = automap_base()
# reflect the tables
#Base.prepare(engine, reflect=True)
#print(Base.classes.keys())
#Incidents_tbl = Base.classes.Incidents

# Save reference to the table
#Passenger = Base.classes.passenger

# Create our session (link) from Python to the DB

#session = Session(engine)

#################################################
# Flask Setup
#################################################
class Incidents_tbl(db.Model):
    __tablename__ = 'Incidents'

    ID = db.Column(db.String(64), primary_key=True)
    Traffic_Item_ID = db.Column(db.String(64))
    Traffic_types = db.Column(db.String(64))
    LatLon = db.Column(db.String(64))
    Lat = db.Column(db.String(64))
    Lon = db.Column(db.String(64))
    Start_time = db.Column(db.String(64))
    End_time = db.Column(db.String(64))
    Criticality = db.Column(db.String(64))
    CritID = db.Column(db.String(64))
    CritDescr = db.Column(db.String(64))
    ItemDescr = db.Column(db.String(64))
    CityName = db.Column(db.String(64))
    Start_Time = db.Column(db.String(64))
    End_Time = db.Column(db.String(64))

    def __repr__(self):
        return '<Incidents %r>' % (self.Traffic_Item_ID)


#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("Traffic_Homepage.html")

@app.route("/Incident_Map")
def Incident_map():
    """Return the homepage."""
    return render_template("Incident_Map.html")


@app.route("/Incident_Map_data")
def Incident_Map_data():
    """Return a list of traffic data including Id, longitude and lattitude, criticality"""
    # Query all passengers
    #results = session.query(Incidents_tbl.Lat).all()
    #results = engine.Execute("SELECT Incidents.Lat FROM Incidents")
    results = db.session.query(Incidents_tbl).all()

    # Create a dictionary from the row data and append to a list of all_parameters
    all_parameters = []
    for traffic in results:
        traffic_dict = {}
        traffic_dict["Traffic_id"] = traffic.Traffic_Item_ID
        traffic_dict["Traffic_type"] = traffic.Traffic_types        
        traffic_dict["Latitude"] = traffic.Lat
        traffic_dict["Longitude"] = traffic.Lon
        traffic_dict["Criticality"] = traffic.Criticality 
        traffic_dict["CritID"] = traffic.CritID 
        traffic_dict["CritDescr"] = traffic.CritDescr 
        traffic_dict["ItemDescr"] = traffic.ItemDescr
        traffic_dict["CityName"] = traffic.CityName
        traffic_dict["Start_Time"] = traffic.Start_Time
        traffic_dict["End_Time"] = traffic.End_Time  

        #print (traffic_dict)
        all_parameters.append(traffic_dict)
        
    return jsonify(all_parameters)

@app.route("/Crit_Heat")
def Crit_Heat():
    """Return the homepage."""
    return render_template("Crit_Heat.html")
    
@app.route("/Crit_Heat_data")
def Crit_Heat_data():
    """Return a list of traffic data including Id, longitude and lattitude, criticality"""
    # Query all passengers
    #results = session.query(Incidents_tbl.Lat).all()
    #results = engine.Execute("SELECT Incidents.Lat FROM Incidents")
    results = db.session.query(Incidents_tbl).all()

    # Create a dictionary from the row data and append to a list of all_parameters
    all_parameters = []
    for traffic in results:
        traffic_dict = {}
        traffic_dict["Traffic_id"] = traffic.Traffic_Item_ID
        traffic_dict["Traffic_type"] = traffic.Traffic_types        
        traffic_dict["Latitude"] = traffic.Lat
        traffic_dict["Longitude"] = traffic.Lon
        traffic_dict["Criticality"] = traffic.Criticality 
        traffic_dict["CritID "] = traffic.CritID 
        traffic_dict["CritDescr "] = traffic.CritDescr 
        traffic_dict["ItemDescr "] = traffic.ItemDescr
        traffic_dict["Start_Time"] = traffic.Start_Time
        traffic_dict["End_Time"] = traffic.End_Time    

        #print (traffic_dict)
        all_parameters.append(traffic_dict)
        
    return jsonify(all_parameters)

@app.route("/Bar_Chart")
def Viz_3():
    """Return the homepage."""
    return render_template("Bar_Chart.html")

@app.route("/Bar_Chart_data")
def Bar_Chart_data():
    """Return a list of traffic data including Id, longitude and lattitude, criticality"""
    # Query all passengers
    #results = session.query(Incidents_tbl.Lat).all()
    #results = engine.Execute("SELECT Incidents.Lat FROM Incidents")
    results = db.session.query(Incidents_tbl).all()

    # Create a dictionary from the row data and append to a list of all_parameters
    all_parameters = []
    for traffic in results:
        traffic_dict = {}
        traffic_dict["Traffic_id"] = traffic.Traffic_Item_ID
        traffic_dict["Traffic_type"] = traffic.Traffic_types        
        traffic_dict["Latitude"] = traffic.Lat
        traffic_dict["Longitude"] = traffic.Lon
        traffic_dict["Criticality"] = traffic.Criticality 
        traffic_dict["CritID "] = traffic.CritID 
        traffic_dict["CritDescr "] = traffic.CritDescr 
        traffic_dict["ItemDescr "] = traffic.ItemDescr
        traffic_dict["Start_Time"] = traffic.Start_Time
        traffic_dict["End_Time"] = traffic.End_Time   

        #print (traffic_dict)
        all_parameters.append(traffic_dict)
        
    return jsonify(all_parameters)


if __name__ == '__main__':
    app.run(debug=True)
