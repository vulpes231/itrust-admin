const devServer = `http://localhost:3300`;
const liveServer = `https://server.quadx.io`;

const links = [
  { id: "login", title: "Login", path: "/" },
  { id: "signup", title: "Signup", path: "/create-admin" },
];
const authLinks = [
  { id: "dash", title: "Dashboard", path: "/dash" },
  { id: "user", title: "Users", path: "/users" },
  { id: "trnx", title: "Transactions", path: "/transactions" },
  { id: "wallet", title: "Wallets", path: "/wallets" },
  { id: "bot", title: "Bots", path: "/bots" },
  { id: "trade", title: "Trades", path: "/trades" },
  { id: "swap", title: "Swap", path: "/swap" },
];

export { devServer, liveServer, links, authLinks };
