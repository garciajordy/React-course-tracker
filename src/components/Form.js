import React, { useState } from 'react'
import axios from "axios";
import store from "../store/Store";
import AddMeasure from "../actions/AddMeasurementAction";

function Form({ courseId }) {
    const [data, setData] = useState()
    function handleSubmit(event) {
        axios.post("http://localhost:3001/measurements", {
            measurement: {
                amount: data,
                course_id: courseId
            }
        }, {withCredentials: true}).then(response => {
            console.log(response.data.measurement)
            if (response.data.status === "created") {
                console.log("test",response.data.status)
                store.dispatch(AddMeasure(response.data.measurement))
                console.log("mystore",store.getState().MeasurementReducer)
            }

        })
        event.preventDefault();
    }

    function handleChange(e) {
        setData(e.target.value)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="number" onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
    )
}

export default Form
