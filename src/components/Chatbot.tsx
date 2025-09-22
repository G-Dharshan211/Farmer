import React, { useState, useRef } from 'react';
import { Send, Upload, Camera, Bot, User, Loader2, Image as ImageIcon } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  image?: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI farming assistant. You can upload photos of plants, and I'll help identify them and provide growing tips. What can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    // Simulate API call to Gemini Vision API
    // In a real implementation, you would call the actual Gemini API
    const mockResponses = [
      "This appears to be a tomato plant (Solanum lycopersicum). Based on the leaf structure and growth pattern, it looks healthy! Here are some care tips:\n\n• Water regularly but avoid overwatering\n• Ensure 6-8 hours of sunlight daily\n• Consider staking for support as it grows\n• Watch for common pests like aphids",
      "I can see this is a wheat plant (Triticum aestivum) in its vegetative stage. The leaves look healthy with good color:\n\n• Continue regular watering\n• Monitor for rust diseases\n• Consider nitrogen fertilizer application\n• Expect heading stage in 4-6 weeks",
      "This looks like a corn plant (Zea mays) in early growth stage. The plant appears vigorous:\n\n• Maintain consistent soil moisture\n• Side-dress with nitrogen fertilizer\n• Watch for corn borers\n• Ensure proper spacing for air circulation"
    ];

    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input || 'Uploaded an image for analysis',
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let botResponse = '';
    
    if (selectedImage) {
      botResponse = await analyzeImage(selectedImage);
    } else {
      // Handle text-based queries
      const query = input.toLowerCase();
      if (query.includes('plant') || query.includes('crop')) {
        botResponse = "I'd be happy to help identify plants! Please upload a clear photo of the plant you'd like me to analyze, and I'll provide identification and care tips.";
      } else if (query.includes('disease') || query.includes('pest')) {
        botResponse = "For disease and pest identification, a photo would be very helpful. Upload an image showing the affected area, and I'll help identify the issue and suggest treatments.";
      } else if (query.includes('fertilizer') || query.includes('nutrition')) {
        botResponse = "Plant nutrition depends on the specific crop and growth stage. Could you tell me what crop you're growing, or upload a photo so I can provide targeted fertilizer recommendations?";
      } else {
        botResponse = "I'm here to help with plant identification and farming advice! You can ask me about crop care, upload plant photos for identification, or inquire about common farming practices.";
      }
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setSelectedImage(null);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Plant Identifier</h2>
              <p className="text-green-100">Upload photos for instant plant identification</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.image && (
                  <div className="mb-3">
                    <img
                      src={message.image}
                      alt="Uploaded plant"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing image...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="px-6 py-2">
            <div className="relative inline-block">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-20 h-20 object-cover rounded-lg border-2 border-green-300"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-end space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-full transition-colors duration-200"
            >
              <Camera className="h-5 w-5" />
            </button>

            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about plants, crops, or upload a photo for identification..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={1}
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="flex-shrink-0 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-3 rounded-full transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ImageIcon className="h-4 w-4" />
              <span>Upload plant photos</span>
            </div>
            <span>•</span>
            <span>Get instant identification & care tips</span>
          </div>
        </div>
      </div>
    </div>
  );
}