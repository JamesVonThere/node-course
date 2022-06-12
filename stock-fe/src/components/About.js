import {useState, useEffect} from 'react';
import axios from 'axios';
import {API_URL} from '../utils/config';

const About = () => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    let getMemberInfo = async () => {
let response = await axios.get(`${API_URL}/member/info`)
    });
  }
  return (
    <div className="m-7">
      <h2 className="m-7 text-2xl text-gray-600">這裡是魚股市</h2>

      <>
        <h3>Hi, 小明</h3>
        <img />
      </>
    </div>
  );
};

export default About;
