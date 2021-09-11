// in gastby-browser.js
import "fontsource-noto-sans-kr";
exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  const { pathname } = location
  console.log(pathname)
  // list of routes for the scroll-to-top-hook
  const scrollToTopRoutes = [`/`]
  // if the new route isn't part of the list above, scroll to top (0, 0)
  if (scrollToTopRoutes.includes(pathname) !== true) {
    window.scrollTo(0, 0)
  }

  return false
}

require("prismjs/themes/prism-tomorrow.css")