import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let &apos s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="item-center mb-12 flex gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? `Placing order` : `Order now`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData(); // Code ที่คิดว่าจะลืม ต้องทวนซ้ำเวลาว่าง
  const data = Object.fromEntries(formData); // Code ที่คิดว่าจะลืม ต้องทวนซ้ำเวลาว่าง
  const order = {
    ...data,
    priority: data.priority === "on", // Code ที่คิดว่าจะลืม ต้องทวนซ้ำเวลาว่าง
    cart: JSON.parse(data.cart), // Code ที่คิดว่าจะลืม ต้องทวนซ้ำเวลาว่าง
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. we might need it to contact you.";
    return errors;
  }

  // console.log(order);
  // const newOrder = await createOrder(order);
  // return redirect(`/order/${newOrder.id}`); // Code ที่คิดว่าจะลืม ต้องทวนซ้ำเวลาว่าง
  return null;
}
export default CreateOrder;
