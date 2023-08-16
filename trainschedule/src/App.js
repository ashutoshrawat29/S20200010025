// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
const Single = () => {
  const [trainsData, setTrainsData] = useState({});
  const params = useParams();

  const fetchData = async () => {
    const data = await axios.get('/getTrains/' + params.id)
    await setTrainsData(data.data)
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      {
        <Link to={`/train/${trainsData.trainNumber}`}>

          <div className='inline-flex flex-wrap space-x-5 space-y-5'>
            <div className='flex flex-col bg-slate-200 rounded-lg '>
              <p>Train Name : {trainsData.trainName}</p>
              <p>Train Number : {trainsData.trainNumber}</p>
              <p>Delayed by : {trainsData.delayedBy}</p>
            </div>
          </div>
        </Link>
      }
    </>
  )
}
const All = () => {
  const [trainsData, setTrainsData] = useState([]);

  const fetchData = async () => {
    const data = await axios.get('/getTrains')
    console.log(data.data);
    await setTrainsData(data.data)
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      <div className='inline-flex flex-wrap space-x-5 space-y-5'>
        {
          trainsData.map((data) => {
            return (
              <Link to={`/train/${data.trainNumber}`}>
                  <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://img.freepik.com/free-photo/steam-train-chugs-through-mountain-forest-scene-generative-ai_188544-8072.jpg?w=996&t=st=1692198374~exp=1692198974~hmac=657d2b251855c2191aa0b34e5f9828495e4a1525bdf6e343a8a0ca9532d588a6" alt=""/>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{data.trainName}</h5>
                      <p class="mb-3 font-normal text-gray-700">Train Number : {data.trainNumber}</p>
                      <p class="mb-3 font-normal text-gray-700 ">Delayed  : {data.delayedBy}</p>
                    </div>
              </Link>
            )
          })
        }
      </div>
    </>
  )
}
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/train/:id" element={<Single />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
