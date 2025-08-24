import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, Lightbulb, User, Mail, MessageSquare, Loader2 } from "lucide-react";

const MediaForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const isAnonymous = watch("isAnonymous");

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const url = import.meta.env.VITE_GSHEET_WEBAPP_URL;
      if (!url) {
        alert("Missing VITE_GSHEET_WEBAPP_URL in .env");
        return;
      }

      // Map MediaForm fields -> existing Apps Script columns:
      // name, email, company, message
      const nameToSend = isAnonymous ? (data.aliasName || "Anonymous") : (data.name || "");
      const emailToSend = isAnonymous ? "" : (data.email || "");
      const companyToSend = "Media Idea"; // tag so you know source in Sheets
      const messageToSend =
        `Headline: ${data.category || ""}\n\n` +
        `Idea:\n${data.idea || ""}\n\n` +
        `Submitted: ${isAnonymous ? "Anonymous" : "Identified"}`;

      const body = new URLSearchParams({
        name: nameToSend,
        email: emailToSend,
        company: companyToSend,
        message: messageToSend,
      }).toString();

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body,
      });

      const text = await res.text();
      const json = JSON.parse(text);

      if (res.ok && json.ok === true) {
        setIsSubmitted(true);
        reset();
        // Keep success visible for a bit
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        throw new Error(json?.error || `Non-OK response ${res.status}`);
      }
    } catch (err) {
      alert("There was an error submitting your idea.\n\n" + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-black border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
      {/* Loading overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
          <div className="flex items-center gap-3 text-white">
            <Loader2 className="animate-spin" size={22} />
            <span className="text-sm md:text-base text-gray-200">Submitting…</span>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full border-2 border-white dark:border-white/[0.2] bg-neutral-900 relative overflow-hidden group">
            {/* Shine effect overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out rounded-full" />
            <Lightbulb className="text-white relative z-10" size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Your idea today, our next headline.
        </h2>
        <p className="text-gray-300">Share your innovative article ideas with MTC</p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-12">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-4">
            <h3 className="text-green-400 text-xl font-semibold mb-2">
              Idea Submitted Successfully!
            </h3>
            <p className="text-gray-300">
              Thank you for sharing your idea with us. We'll review it and get back to you soon.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-white font-medium mb-2">
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              <input
                {...register("name", {
                  required: !isAnonymous || "Name is required unless anonymous",
                })}
                type="text"
                disabled={isAnonymous || isSubmitting}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{String(errors.name.message)}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2">
                <Mail size={16} className="inline mr-2" />
                Email Address
              </label>
              <input
                {...register("email", {
                  required: !isAnonymous || "Email is required unless anonymous",
                  pattern: isAnonymous
                    ? undefined
                    : {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                })}
                type="email"
                disabled={isAnonymous || isSubmitting}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{String(errors.email.message)}</p>
              )}
            </div>
          </div>

          {/* Anonymous toggle */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-white">
                Submit anonymously (we'll use an alias to contact you if selected)
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register("isAnonymous")}
                  type="checkbox"
                  className="sr-only peer"
                  disabled={isSubmitting}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
              </label>
            </div>
          </div>

          {/* Alias if anonymous */}
          {isAnonymous && (
            <div>
              <label className="block text-white font-medium mb-2">Alias Name (for contact)</label>
              <input
                {...register("aliasName", {
                  required: isAnonymous ? "Alias name is required for anonymous submissions" : false,
                })}
                type="text"
                disabled={isSubmitting}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors"
                placeholder="Enter an alias name"
              />
              {errors.aliasName && (
                <p className="text-red-400 text-sm mt-1">{String(errors.aliasName.message)}</p>
              )}
            </div>
          )}

          {/* Headline */}
          <div>
            <label className="block text-white font-medium mb-2">Headline</label>
            <input
              {...register("category", {
                required: "Please enter a headline",
                minLength: { value: 2, message: "Headline must be at least 2 characters" },
              })}
              type="text"
              disabled={isSubmitting}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors"
              placeholder="Enter your idea headline"
            />
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">{String(errors.category.message)}</p>
            )}
          </div>

          {/* Idea */}
          <div>
            <label className="block text-white font-medium mb-2">
              <MessageSquare size={16} className="inline mr-2" />
              Your Idea
            </label>
            <textarea
              {...register("idea", {
                required: "Please describe your idea",
                minLength: { value: 50, message: "Please provide at least 50 characters" },
              })}
              rows={6}
              disabled={isSubmitting}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors resize-none"
              placeholder="Describe your idea in detail"
            />
            {errors.idea && (
              <p className="text-red-400 text-sm mt-1">{String(errors.idea.message)}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-semibold py-4 px-6 rounded-xl border-2 border-white dark:border-white/[0.2] transition-all duration-300 ease-out transform flex items-center justify-center gap-2 cursor-pointer ${
              isSubmitting
                ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                : "bg-neutral-900 text-white hover:scale-105 hover:bg-neutral-800"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Submitting…
              </>
            ) : (
              <>
                <Send size={20} />
                Submit Your Idea
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default MediaForm;
