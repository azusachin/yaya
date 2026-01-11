const Seo = ({ title, description }) => {
  if (typeof document !== "undefined") {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    }
  }

  return null;
};

export default Seo;
