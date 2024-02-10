import { useGetUsersQuery } from "../../redux/services/userApi";
import "./Users.css"

export default function Users() {
  const { data: users } = useGetUsersQuery();

  return (
    <div>
      Users:
      {users && users.length > 0 ? (
        users.map((user) => {
          return (
            <div key={user.id} className="user">
              <p>#{user._id}</p>
              <h4>{user.username}</h4>
              <h4>{user.email}</h4>
            </div>
          );
        })
      ) : (
        <>No users found</>
      )}
    </div>
  );
}
