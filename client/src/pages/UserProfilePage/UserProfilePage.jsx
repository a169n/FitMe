import { useUser } from "../../hooks/useUser";
import { useGetUserDetailsQuery } from "../../redux/services/usersApi";
import "./UserProfilePage.css";

export default function UserProfilePage() {
  const user = useUser();

  const { data: userData } = useGetUserDetailsQuery(user?._id, {
    skip: !user?._id,
  });

  return (
    <div className="global-padding">
      <h2>User Profile Page. Hello {user?.username}</h2>

      <div>
        <h3>Orders:</h3>
        {userData?.orders.map((order) => (
          <div key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Total Sum: {order.totalSum}</p>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Cart:</h3>
        {userData?.cart.map((item) => (
          <div key={item._id}>
            <p>Product ID: {item._id}</p>
            <p>Amount: {item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
