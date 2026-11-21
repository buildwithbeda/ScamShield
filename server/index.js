import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🛡️  ScamShield Backend Server Running on Port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Admin Auth:   http://localhost:${PORT}/api/auth/login`);
  console.log(`======================================================\n`);
});
