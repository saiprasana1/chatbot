// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hello! I\'m your fitness food assistant. Tell me your fitness goal (gain/lose/maintain), food preference (veg/non-veg), and meal time (breakfast/lunch/dinner/snack). You can also ask how to cook a specific food.' }
//   ]);
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     const userMessage = { sender: 'user', text: input };
//     const botMessage = { sender: 'bot', text: generateResponse(input) };
//     setMessages([...messages, userMessage, botMessage]);
//     setInput('');
//   };

//   const generateResponse = (input) => {
//     const lowerInput = input.toLowerCase();

//     const recipes = {
//       "grilled chicken": `1. Marinate chicken with olive oil, lemon juice, garlic, pepper, and salt.\n2. Let it rest for 30 minutes.\n3. Grill each side for 6–7 minutes on medium heat.\n4. Serve hot with salad.`,
//       "paneer curry": `1. Heat oil, sauté onions, tomatoes, ginger-garlic paste.\n2. Add spices (turmeric, chili powder, garam masala).\n3. Add paneer cubes and water.\n4. Simmer for 10 minutes and garnish with coriander.`,
//       "oats": `1. Boil 1 cup of milk or water.\n2. Add 1/2 cup of oats.\n3. Stir and cook for 5–7 minutes.\n4. Add banana, nuts, or honey as topping.`,
//       "boiled eggs": `1. Place eggs in a saucepan, cover with water.\n2. Bring to a boil.\n3. Cover, turn off heat, and let sit for 9–12 minutes.\n4. Cool in ice water and peel.`,
//       "chicken salad": `1. Boil or grill chicken breast and dice it.\n2. Mix with lettuce, cucumbers, onions, olive oil, lemon juice, salt & pepper.\n3. Optional: add boiled eggs or avocado.`
//     };

//     for (let key in recipes) {
//       if (lowerInput.includes(key) && (
//           lowerInput.includes("how to cook") ||
//           lowerInput.includes("prepare") ||
//           lowerInput.includes("recipe")
//         )) {
//         return recipes[key];
//       }
//     }

//     const goalMatch = lowerInput.match(/gain|lose|maintain/);
//     const prefMatch = lowerInput.match(/veg|non-veg/);
//     const mealMatch = lowerInput.match(/breakfast|lunch|dinner|snack/);

//     if (!goalMatch || !prefMatch || !mealMatch) {
//       return "You can ask about your diet goal or cooking! For example:\n- I want to gain weight, I'm non-veg, suggest dinner\n- How to cook grilled chicken?";
//     }

//     const goal = goalMatch[0];
//     const pref = prefMatch[0];
//     const meal = mealMatch[0];

//     const foodSuggestions = {
//       gain: {
//         veg: {
//           breakfast: "Try peanut butter toast with banana, oats with almonds, and a glass of whole milk.",
//           lunch: "Brown rice, paneer curry, mixed veggies, and dal with ghee.",
//           dinner: "Chapati with soya chunks curry and curd rice.",
//           snack: "Dry fruits, peanut laddu, or protein bar."
//         },
//         'non-veg': {
//           breakfast: "Egg omelet with toast, Greek yogurt, and fruit.",
//           lunch: "Chicken breast, brown rice, boiled eggs, and salad.",
//           dinner: "Grilled fish or chicken with sweet potatoes and broccoli.",
//           snack: "Boiled eggs, tuna salad, or protein shake."
//         }
//       },
//       lose: {
//         veg: {
//           breakfast: "Oats with fruits, chia seeds, and black coffee.",
//           lunch: "Millet or brown rice with dal and steamed veggies.",
//           dinner: "Mixed vegetable soup and a small salad.",
//           snack: "Cucumber sticks, sprouts, or green tea."
//         },
//         'non-veg': {
//           breakfast: "Boiled eggs, green tea, and apple.",
//           lunch: "Grilled chicken salad with olive oil dressing.",
//           dinner: "Boiled eggs and veggie soup.",
//           snack: "Boiled chicken slices or black coffee."
//         }
//       },
//       maintain: {
//         veg: {
//           breakfast: "Upma or poha with veggies and a glass of milk.",
//           lunch: "Rice, dal, and sabji with curd.",
//           dinner: "Chapati with vegetables and a glass of buttermilk.",
//           snack: "Fruit salad or roasted nuts."
//         },
//         'non-veg': {
//           breakfast: "Omelet, toast, and milk.",
//           lunch: "Chicken curry with rice and salad.",
//           dinner: "Egg curry with  rice and rotti.",
//         }
//       }
//     }
//     return foodSuggestions[goal][pref][meal];
//     }
//   return (
    
//     <div className="App">
//       <h1>DNA Chatbot</h1>
//       <div className="chat-box">
//         {messages.map((msg, i) => (
//           <div key={i} className={`message ${msg.sender}`}>{msg.text}</div>
//         ))}
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
  
//   );
//       }
// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm your fitness food assistant. Ask me anything related to fitness, food, recipes, or your goals!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that gives fitness food advice, meal plans, and cooking recipes.',
            },
            ...messages.map((m) => ({
              role: m.sender === 'bot' ? 'assistant' : 'user',
              content: m.text,
            })),
           
            {
              role: 'user',
              content: input,
            },
          ],
        },
        {
          headers: {
             'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
           
          },
        }
      );
    
      

      const botReply = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
        console.log(botReply);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h1 className="title">DNA Chatbot (AI)</h1>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="loading">Typing...</div>}
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="input-field"
          />
          <button onClick={handleSend} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
