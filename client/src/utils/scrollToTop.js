const scrollToTop = () => {
  document.querySelector('html').style.scrollBehavior = 'smooth';
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

export default scrollToTop;
