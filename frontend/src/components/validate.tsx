// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { IUser } from '../interfaces/user-interface';
// import { useUser } from '../contexts/user-context';

// const Validate = () => {
//     const { user, updateUser, ip } = useUser();

//     const validate = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8000/validate`, {
//               withCredentials: true,
//             });
//             return response.data;
//         } catch (error) {
//           return null;
//         }
//     };

//     validate()
//     .then((res: IUser) => {
//       if (res && !user) {
//         updateUser(res);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });


// export default Validate;
