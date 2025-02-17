<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h2>🎬 FilmCorner</h2>
          <p>Filmat më të fundit, direkt tek ju!</p>
        </div>
  
        <div class="footer-section">
          <h3>Lidhje të Shpejta</h3>
          <ul>
            <li><router-link to="/movies">Filmat</router-link></li>
            <li><router-link to="/categories">Kategoritë</router-link></li>
            <li><router-link to="/contact">Kontakt</router-link></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3>Na Ndiqni</h3>
          <div class="social-links">
            <a href="https://facebook.com" target="_blank">📘 Facebook</a>
            <a href="https://instagram.com" target="_blank">📷 Instagram</a>
            <a href="https://twitter.com" target="_blank">🐦 Twitter</a>
          </div>
        </div>
      </div>
  
      <div class="footer-bottom">
        <p>&copy; 2025 FilmCorner. Të gjitha të drejtat e rezervuara.</p>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background: #222;
    color: white;
    padding: 20px 0;
    text-align: center;
    margin-top: 40px;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px;
  }
  
  .footer-section {
    margin: 10px;
  }
  
  .footer-section h3 {
    margin-bottom: 10px;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 5px;
  }
  
  .footer-section ul li a {
    color: #FFD700;
    text-decoration: none;
  }
  
  .footer-section ul li a:hover {
    text-decoration: underline;
  }
  
  .social-links a {
    display: block;
    color: white;
    margin: 5px 0;
    text-decoration: none;
  }
  
  .social-links a:hover {
    text-decoration: underline;
  }
  
  .footer-bottom {
    background: #111;
    padding: 10px;
    font-size: 14px;
  }
  </style>
  