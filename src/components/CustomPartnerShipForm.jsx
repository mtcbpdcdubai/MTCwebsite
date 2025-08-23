import React, { useState } from 'react';
import { Button, Input, Textarea } from '@heroui/react';
import { Send, User, Mail, Building, MessageSquare } from 'lucide-react';

const CustomPartnershipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link
      const subject = encodeURIComponent('Partnership Inquiry from ' + formData.name);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company}\n\n` +
        `Message:\n${formData.message}`
      );
      
      const mailtoLink = `mailto:f20230241@dubai.bits-pilani.ac.in?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      alert('Thank you for your interest! Your email client should open with the partnership inquiry.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      alert('There was an error processing your request. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Start the Conversation
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Tell us about your vision and let's explore how we can make it reality together.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <User className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Mail className="text-gray-400" size={20} />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Building className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Company/Organization"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-6 z-10">
              <MessageSquare className="text-gray-400" size={20} />
            </div>
            <textarea
              placeholder="Tell us about your partnership vision..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={6}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-4 rounded-xl transition-colors"
            isLoading={isSubmitting}
            startContent={!isSubmitting && <Send size={18} />}
          >
            {isSubmitting ? 'Sending...' : 'Send Partnership Inquiry'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CustomPartnershipForm;