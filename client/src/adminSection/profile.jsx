/* eslint-disable no-unused-vars */

import Sidebar from "../adminComponents/sidebar";
import UserContent from "../adminComponents/userContent";

const Profile = () => {
  return (
    <div className="flex m-5 p-5 h-[100vh] font-serif">
      <Sidebar />
      <UserContent />
    </div>
  );
};

export default Profile;
