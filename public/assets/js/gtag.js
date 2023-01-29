/* eslint-disable prefer-rest-params */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */

function gtag() {
    dataLayer.push(arguments);
  }
  (window.dataLayer = window.dataLayer || []),
    gtag('js', new Date()),
    gtag('config', '', { page_path: window.location.pathname });