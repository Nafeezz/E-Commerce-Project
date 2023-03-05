import { useCallback, useContext, useRef } from "react";
import { CartContext } from "../../context/cart-context";
import useRazorpay from "react-razorpay";
import "./cart.css"

const Cart = ()=> {
    const {cartData} = useContext(CartContext);
    const total = useRef();
    const RazorPay = useRazorpay();
    const razorPayDisplay = useCallback(async (total)=> {
        const options = {
            key: "rzp_test_KcRLeKSaKACIEC",
            amount: total*100,
            currency: "INR",
            name: "10x-Gaming-Site",
            description: "Gaming Transaction",
            handler: (res)=> {
                console.log(res);
            },
            prefill: {
                name: "Nafeez Akhund",
                email: "akhundnafeez2901@gmail.com",
                contact: "1234567890"
            
            },
            notes: {
                address: "work address"
            },
            theme: {
                color: "#3399cc",
            },
        }
        const rzp1 = new RazorPay(options);
        rzp1.open();
        
    }, [RazorPay])
    
    //total.current.price = 0;
    return (
        <>
            <section id="main">
                <section>
                {cartData.map((cartItem)=> {
                return (
                    <article>
                        <img src={`http://localhost:1337${cartItem?.image?.data?.attributes?.url}`} alt="image"/>
                        <article className="cartitem-title">{cartItem.title}</article>
                        <article className="cartitem-price">{cartItem.price}</article>
                        <button className="remove-cart">Remove from cart</button>
                    </article>
                )
            })}
                </section>
                <section>
                <article className="billing">Billing Information </article>
                  {cartData.map((cart)=> {
                      //total.current.price = total.current.price + cart.price
                      return <article >
                          <span className="span">{cart.title}</span>
                          <span className="span">{cart.price}</span>
                      </article>
                  })}
                  <article className="span">Total: 3000</article>
                  <button onClick={()=>{razorPayDisplay(6000)}} className="checkout">Checkout</button>
                </section>
            </section>
           
        </>
    )
}
export default Cart;