import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Send, User, Mail, Building, MessageSquare } from 'lucide-react';

const CustomPartnershipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitted(false);

  try {
    const url = import.meta.env.VITE_GSHEET_WEBAPP_URL;

    // URL-encoded (simple request, no CORS preflight)
    const body = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
    }).toString();

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body
    });

    const text = await res.text();
    let json; try { json = JSON.parse(text); } catch { throw new Error(`Unexpected response: ${text.slice(0,200)}...`); }

    if (res.ok && json.ok === true) {
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    } else {
      throw new Error(json?.error || `Non-OK response ${res.status}`);
    }
  } catch (err) {
    alert("There was an error submitting your response. Please try again.\n\n" + err.message);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 justify-center flex">
            Start the Conversation
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Tell us about your vision and let's explore how we can make it reality together.
          </p>
        </div>

        {submitted && (
          <p className="text-green-400 mb-4">✅ Your response has been submitted!</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Company/Organization"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-4 top-6 text-gray-400" size={20} />
            <textarea
              placeholder="Tell us about your partnership vision..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={6}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-neutral-900 text-white font-semibold py-4 px-6 rounded-xl border-2 border-white dark:border-white/[0.2] transition-all duration-300 ease-out transform hover:scale-105 hover:bg-neutral-800 flex items-center justify-center gap-2 cursor-pointer"
            isLoading={isSubmitting}
            startContent={!isSubmitting && <Send size={18} />}
          >
            {isSubmitting ? "Sending..." : "Send Partnership Inquiry"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CustomPartnershipForm;
