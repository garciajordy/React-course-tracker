import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import store from '../store/Store';
import AddMeasure from '../actions/AddMeasurementAction';
import RemoveMeasure from '../actions/RemoveMeasurementAction';

function Show() {
  const history = useHistory();
  const storeMeasurements = store.getState().MeasurementReducer;
  const [data, setData] = useState('');
  const [measurements, setMeasurements] = useState([]);
  const course = store.getState().CourseReducer;
  function getMeasurements() {
    axios.get(`http://localhost:3001/courses/${course.id}`, { withCredentials: true }).then((response) => {
      setMeasurements([]);
      setMeasurements(response.data.measurements.map((p) => p));
      measurements.map((data) => {
        const array = storeMeasurements.map((data) => data.id);
        if (array.includes(data.id)) {
          return '';
        }
        return store.dispatch(AddMeasure(data));
      });
    });
  }
  useEffect(() => {
    if (course.name.length < 1) {
      history.push('/dashboard');
    } else {
      getMeasurements();
    }
  }, []);

  function deleteMeasurement(id) {
    axios.delete(`http://localhost:3001/measurements/${id}`, { withCredentials: true })
      .then(() => {
        store.dispatch(RemoveMeasure(id));
        setMeasurements(measurements.filter((item) => parseInt(item.id, 10) !== parseInt(id, 10)));
      })
      .catch((err) => err);
  }
  function handleSubmit(event) {
    axios.post('http://localhost:3001/measurements', {
      measurement: {
        amount: data,
        course_id: course.id,
      },
    }, { withCredentials: true }).then((response) => {
      if (response.data.status === 'created') {
        store.dispatch(AddMeasure(response.data.measurement));
        setMeasurements((prev) => [...prev, response.data.measurement]);
        setData('');
      }
    });
    event.preventDefault();
  }

  function handleChange(e) {
    setData(e.target.value);
  }
  return (
    <div className="show-container">
      <div className="header">
        {course.name}
        .it
      </div>
      <h1 className="dashboard">{course.name}</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Write how many minutes..." value={data} onChange={handleChange} />
        <button className="add-button" type="submit">Add</button>
      </form>
      { measurements.reverse().map((data) => {
        const data2 = new Date(data.created_at.substring(0, 10));
        return (
          <div key={data.id} className="measurement-component">
            <div className="flex-row">

              <CircularProgress variant="determinate" value={data.amount} />
              <p key={data.created_at}>{data2.toString().substring(0, 16)}</p>
            </div>
            <div className="grid-columns">

              <p className="min-para" key={data.amount}>
                {data.amount}
                {' '}
                Min
              </p>
              <button type="button" onClick={() => deleteMeasurement(data.id)} key={data.id}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Show;
