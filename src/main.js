import Vue from 'vue'
import App from "./components/App.vue";

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/dist/service-worker.js');
  });
}

// Basic Vue setup
new Vue({
  render: h => h(App)
}).$mount('#app');
