import RemoveBtn from "./RemoveBtn.jsx";

const getOrder = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/orders", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading orders: ", error);
  }
};

export default async function ShopingCart() {
  const { orders } = await getOrder();

  return (
    <>
      {orders.map((order) => (
        <div key={order._id}>
          <div>
            <h2>{order.title}</h2>
            <div>{order.description}</div>
          </div>

          <div>
            <RemoveBtn id={order._id} />
          </div>
        </div>
      ))}
    </>
  );
}
