import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, Lightbulb, User, Mail, MessageSquare } from "lucide-react";

const IdeaSubmissionForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const isAnonymous = watch("isAnonymous");

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  return (
    <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
            <Lightbulb className="text-white" size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Your idea today, our next big play.
        </h2>
        <p className="text-gray-300">
          Share your innovative ideas with MTC and help shape the future of
          technology
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-12">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-4">
            <h3 className="text-green-400 text-xl font-semibold mb-2">
              Idea Submitted Successfully!
            </h3>
            <p className="text-gray-300">
              Thank you for sharing your idea with us. We'll review it and get
              back to you soon.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                <Mail size={16} className="inline mr-2" />
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-white">
                Submit anonymously (we'll use an alias to contact you if
                selected)
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register("isAnonymous")}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
              </label>
            </div>
          </div>

          {isAnonymous && (
            <div>
              <label className="block text-white font-medium mb-2">
                Alias Name (for contact purposes)
              </label>
              <input
                {...register("aliasName", {
                  required: isAnonymous
                    ? "Alias name is required for anonymous submissions"
                    : false,
                })}
                type="text"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors"
                placeholder="Enter an alias name"
              />
              {errors.aliasName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.aliasName.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-white font-medium mb-2">
              Idea Category
            </label>
            <select
              {...register("category", {
                required: "Please select a category",
              })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors"
            >
              <option value="">Select a category</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-app">Mobile App</option>
              <option value="ai-ml">AI/Machine Learning</option>
              <option value="blockchain">Blockchain</option>
              <option value="iot">Internet of Things</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              <MessageSquare size={16} className="inline mr-2" />
              Your Idea
            </label>
            <textarea
              {...register("idea", {
                required: "Please describe your idea",
                minLength: {
                  value: 50,
                  message: "Please provide at least 50 characters",
                },
              })}
              rows={6}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors resize-none"
              placeholder="Describe your idea in detail. What problem does it solve? How would you implement it? What makes it unique?"
            />
            {errors.idea && (
              <p className="text-red-400 text-sm mt-1">{errors.idea.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Submit Your Idea
          </button>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              <strong>Rewards:</strong> Selected ideas may receive mentorship,
              funding opportunities, or the chance to lead a project team. We
              believe in turning great ideas into reality!
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default IdeaSubmissionForm;
