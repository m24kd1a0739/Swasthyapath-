import http from 'http';

const routes = [
  '/',
  '/login',
  '/register',
  '/otp',
  '/profile-setup',
  '/home',
  '/health-problem',
  '/care-navigation',
  '/facilities',
  '/facility-details',
  '/appointments',
  '/queue',
  '/consultation',
  '/tests-reports',
  '/referrals',
  '/medicines',
  '/medicine-reminder',
  '/care-plan',
  '/health-journey',
  '/follow-up',
  '/notifications',
  '/account',
  '/emergency',
  '/health-worker',
  '/facility-staff',
  '/admin',
  '/unknown-fallback'
];

async function testRoute(path) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:5173${path}`, (res) => {
      resolve({ path, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing SwasthyaPath routes against dev server...');
  for (const r of routes) {
    const res = await testRoute(r);
    console.log(`Route ${res.path.padEnd(22)} -> Status: ${res.statusCode || res.error}`);
  }
}

run();
