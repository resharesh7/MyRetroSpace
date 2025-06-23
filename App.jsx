import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, Sparkles, Users, MessageCircle, Music } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProfileEditor() {
  const [code, setCode] = useState("<h1>Welcome to MyPage!</h1><p>This is my awesome profile.</p>");
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState("Guest");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        const container = document.querySelector('.rain-text');
        if (container && container.children.length < 50) {
          const span = document.createElement('span');
          span.style.left = Math.random() * 100 + '%';
          span.style.fontSize = (Math.random() * 20 + 10) + 'px';
          span.textContent = ['★','♥','☮','♪','✿','⚡'][Math.floor(Math.random()*6)];
          container.appendChild(span);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user, content: message }]);
      setMessage("");
    }
  };

  return (
    <div className={\`min-h-screen p-6 transition-colors duration-500 \${dark ? "bg-black text-white" : "bg-gradient-to-br from-pink-200 via-white to-yellow-100 text-gray-900"}\`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold flex items-center gap-2">
          <Sparkles className="text-pink-500 animate-pulse" />
          MyRetroSpace
        </h1>
        <div className="flex items-center gap-4">
          <Input className="w-40" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Your name" />
          <Button variant="outline" onClick={() => setDark(!dark)}>
            {dark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-xl">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">Edit Your Profile Code</h2>
            <Textarea
              className="h-64 font-mono text-sm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter custom HTML/CSS/JS here"
            />
          </CardContent>
        </Card>

        <Card className="shadow-xl relative overflow-hidden">
          <CardContent className="p-4 bg-white text-black">
            <h2 className="text-xl font-bold text-purple-600 mb-2">Live Preview</h2>
            <div
              className="prose max-w-full h-96 overflow-auto bg-opacity-70 backdrop-blur border border-dashed border-gray-400 p-3 rounded"
              dangerouslySetInnerHTML={{ __html: code + `
                <style>
                  .rain-text span {
                    position: absolute;
                    animation: fall 4s linear infinite;
                    color: #00f0ff;
                    font-weight: bold;
                    font-family: monospace;
                  }
                  @keyframes fall {
                    0% { top: -10%; opacity: 1; }
                    100% { top: 110%; opacity: 0; }
                  }
                </style>
                <div class='rain-text'></div>` }}
            ></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="shadow-md">
          <CardContent className="p-4 space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="text-green-500" /> Friends Directory (Static Demo)
            </h3>
            <ul className="list-disc ml-6 text-sm">
              <li>RetroKid88</li>
              <li>CodingQueen92</li>
              <li>VHSMaster</li>
              <li>PixelPunk</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4 space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="text-cyan-500" /> Messages
            </h3>
            <div className="h-32 overflow-y-auto border rounded p-2 bg-white text-black">
              {messages.map((msg, i) => (
                <p key={i}><strong>{msg.user}:</strong> {msg.content}</p>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="shadow-md">
          <CardContent className="p-4 space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Music className="text-pink-500" /> Background Music (Embed Sample)
            </h3>
            <div className="bg-white p-2 rounded">
              <iframe
                className="w-full h-20"
                src="https://open.spotify.com/embed/track/7GhIk7Il098yCjg4BQjzvb?utm_source=generator"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}