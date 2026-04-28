import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import CartItem from "./CartItem";

function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Cart ({totalQuantity} items)</h2>
      </div>

      <div className="card-body">
        {items.length === 0 ? (
          <p className="text-muted">Your cart is empty</p>
        ) : (
          <>
            <div className="list-group mb-3">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <h4>Total: ${totalPrice.toFixed(2)}</h4>

            <button className="btn btn-danger" onClick={handleClearCart}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;