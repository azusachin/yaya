import { useState } from "react";
import { useLanguage } from "./LanguageContext.jsx";

const FeedbackForm = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("sent");
  };

  return (
    <section className="feedback">
      <div>
        <h3>{language === "zh" ? "反馈与建议" : "Feedback"}</h3>
        <p>
          {language === "zh"
            ? "我们期待你的建议，帮助完善实验教学体验。"
            : "Share your thoughts to improve the learning experience."}
        </p>
      </div>
      <form className="feedback__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={language === "zh" ? "你的姓名" : "Your name"}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={language === "zh" ? "你的邮箱" : "Email"}
          required
        />
        <textarea
          name="message"
          placeholder={language === "zh" ? "你的建议或问题" : "Your feedback"}
          rows={4}
          required
        />
        <button className="button" type="submit" disabled={status === "sent"}>
          {status === "sent"
            ? language === "zh"
              ? "已提交"
              : "Sent"
            : language === "zh"
              ? "提交反馈"
              : "Send"}
        </button>
      </form>
    </section>
  );
};

export default FeedbackForm;
