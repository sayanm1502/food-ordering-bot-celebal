// src/Home.js
import React, { useState, useEffect, useRef } from 'react';
import './Home.css'; // Import the CSS file for styling

const Home = ({ username }) => {
  const [userQuery, setUserQuery] = useState('');
  const [botResponses, setBotResponses] = useState([]);

  
  const messagesEndRef = useRef(null);

  const botResponsesData = [
    { query: 'Order meal', response: 'Sure! Please select an item from the menu to order.' },
    { query: 'Cancel meal', response: 'Your order has been canceled.' },
    { query: 'Update meal', response: 'You can now modify your order.' },
    { query: 'Pay', response: 'Please pay using the following UPI code: abc@upi' },
    { query: 'Default', response: "I'm sorry, I don't understand. Please provide a valid instruction." },
  ];

  const menuItems = [
    { id: 1, name: 'Burger', price: 9.99, description: 'Delicious burger with all the fixings.' },
    { id: 2, name: 'Pizza', price: 12.99, description: 'Classic pizza with your favorite toppings.' },
    { id: 3, name: 'Salad', price: 6.99, description: 'Fresh and healthy salad with dressing.' },
    
  ];

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [order, setOrder] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentUPI, setPaymentUPI] = useState('');
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleUserQuery = (query) => {
    let matchedResponse = botResponsesData.find(
      (item) => item.query.toLowerCase() === query.toLowerCase()
    );

    if (!matchedResponse) {
      matchedResponse = botResponsesData.find((item) => item.query === 'Default');
    }

    setBotResponses([
      ...botResponses,
      { type: 'user', message: query },
      { type: 'bot', message: matchedResponse.response },
    ]);

    // Show menu only after "Order meal" query is entered
    setIsMenuVisible(query.toLowerCase() === 'order meal');

    // Reset order, order placement status, and payment UPI
    if (query.toLowerCase() === 'cancel meal') {
      setOrder([]);
      setIsOrderPlaced(false);
      setPaymentUPI('');
    }

    // Set UPI code for payment
    if (query.toLowerCase() === 'pay') {
      setPaymentUPI('abc@upi');
      setIsPaymentVisible(true);
    }

    setUserQuery('');
  };

  const handleMenuItemSelection = (item) => {
    setSelectedMenuItem(item);
  };

  const handleProceedToOrder = () => {
    if (!selectedMenuItem || selectedQuantity <= 0) return;

    const itemOrder = {
      item: selectedMenuItem,
      quantity: selectedQuantity,
    };

    setBotResponses([
      ...botResponses,
      { type: 'user', message: `Order ${itemOrder.quantity} ${itemOrder.item.name}(s)` },
      { type: 'bot', message: `Sure! You have ordered ${itemOrder.quantity} ${itemOrder.item.name}(s).` },
    ]);

    // Add item to the order list
    setOrder([...order, itemOrder]);

    // Reset selected item and quantity
    setSelectedMenuItem(null);
    setSelectedQuantity(1);
  };

  const handleProceedToPay = () => {
    // Show payment section
    setIsOrderPlaced(true);
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (userQuery.trim() !== '') {
      handleUserQuery(userQuery);
    }
  };

  // Scroll to the latest message on bot response update
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [botResponses]);

  return (
    <div className="chat-container">
      <h2>Hello, {username}! How can I assist you today?</h2>
      <div className="chat-messages">
        {botResponses.map((response, index) => (
          <div key={index} className={`message ${response.type}`}>
            {response.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isMenuVisible && (
        <div>
          <h3>Menu:</h3>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => handleMenuItemSelection(item)}>Select</button>
              </li>
            ))}
          </ul>
          {selectedMenuItem && (
            <div>
              <p>Selected Item: {selectedMenuItem.name}</p>
              <label>Quantity:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}
              />
              <button onClick={() => setSelectedMenuItem(null)}>Cancel</button>
              <button onClick={handleProceedToOrder}>Add to Order</button>
            </div>
          )}
          <button onClick={handleProceedToPay} disabled={order.length === 0}>
            Proceed to Pay
          </button>
        </div>
      )}
      {isOrderPlaced && (
        <div>
          <h3>Final Bill:</h3>
          <ul>
            {order.map((itemOrder) => (
              <li key={itemOrder.item.id}>
                {itemOrder.item.name} - ${itemOrder.item.price} x {itemOrder.quantity} = $
                {itemOrder.item.price * itemOrder.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${order.reduce((total, itemOrder) => total + itemOrder.item.price * itemOrder.quantity, 0)}</p>
          <button onClick={() => handleUserQuery('Pay')}>Pay</button>
        </div>
      )}
      {isPaymentVisible && (
        <div>
          <h3>Payment:</h3>
          <p>Please pay using the following UPI code:</p>
          <p>{paymentUPI}</p>
        </div>
      )}
      <form onSubmit={handleQuerySubmit}>
        <input
          type="text"
          placeholder="Enter your query"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Home;
