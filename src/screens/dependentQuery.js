import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

function fetchUserByEmail(email) {
  return axios.get(`http://localhost:4000/users/${email}`);
}

function fetchCourseByChannelId(channelId) {
  return axios.get(`http://localhost:4000/channel/${channelId}`);
}

function DependentQuery({email}) {
  const {data: user} = useQuery(['user', email], () => fetchUserByEmail(email));
  const channelId = user?.data.channelId;

  const {data: course} = useQuery(['channel', channelId], () => fetchCourseByChannelId(channelId), {
    enabled: !!channelId // dengan begini jika channelId undifined maka dia tidak akan menjalankan query, dia akan dijalnkan jika channelId Tersedia
  })

  return(
    <div>
      <ul>
        {course?.data.course.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default DependentQuery;