import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import store from "../store/Store";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AddMeasure from "../actions/AddMeasurementAction";
import RemoveMeasure from "../actions/RemoveMeasurementAction";
import DeleteIcon from '@material-ui/icons/Delete';

function Show() {
    let history = useHistory()
    let storeMeasurements = store.getState().MeasurementReducer;
    const [data, setData] = useState("")
    const [measurements, setMeasurements] = useState([])
    const course = store.getState().CourseReducer
    useEffect(() => {
        if (course.name.length < 1) {
            history.push("/dashboard")
        } else {
            getMeasurements()
        }
    }, [])
 
    function deleteMeasurement(id) {
        axios.delete(`http://localhost:3001/measurements/${id}`, { withCredentials: true})
            .then(response => {
                store.dispatch(RemoveMeasure(id))
                setMeasurements(measurements.filter(item => parseInt(item.id) !== parseInt(id)))
            })
            .catch(err => err)
    }
    function getMeasurements() {
        axios.get(`http://localhost:3001/courses/${course.id}`, { withCredentials: true}).then(response => {
            setMeasurements([])
            setMeasurements(response.data.measurements.map((p) => p));
            measurements.map(data => {
                let array = storeMeasurements.map(data => data.id)
                if (array.includes(data.id)) {
                    return ""
                } else {
                    return store.dispatch(AddMeasure(data))
                }
            })
        })
    }
    function handleSubmit(event) {
        axios.post("http://localhost:3001/measurements", {
            measurement: {
                amount: data,
                course_id: course.id
            }
        }, {withCredentials: true}).then(response => {
            console.log(response.data.measurement)
            if (response.data.status === "created") {
                console.log("test",response.data.status)
                store.dispatch(AddMeasure(response.data.measurement))
                setMeasurements(prev => [...prev, response.data.measurement])
                setData("")
                console.log("mystore",store.getState().MeasurementReducer)
            }

        })
        event.preventDefault();
    }

    function handleChange(e) {
        setData(e.target.value)
    }
    return (
        <div className="show-container">
            <h1 className="dashboard">{course.name}</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Write how many minutes..." value={data} onChange={handleChange} />
                <button className="add-button" type="submit">Add</button>
            </form>
            { measurements.reverse().map(data => {
                let data2 = new Date(data.created_at.substring(0, 10))
                let dateToday = new Date()
                console.log(data2, dateToday, data2.toString().substring(0, 16) === dateToday.toString().substring(0, 16))
                return <div className="measurement-component">
                   {/* {data2.toString().substring(0, 16) === dateToday.toString().substring(0, 16) ? <div className="today-bar">Today</div> : "" } */}
                    <div className="flex-row">

                        <CircularProgress variant="determinate" value={data.amount} />
                        <p key={data.created_at}>{data2.toString().substring(0, 16)}</p>
                    </div>
                    <div className="grid-columns">

                        <p className="min-para" key={data.amount}>{data.amount} Min</p>
                        <button type="button" onClick={() => deleteMeasurement(data.id)} key={data.id}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            }
                
            )}
        </div>
    )
}

export default Show
