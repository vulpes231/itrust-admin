export const getAccessToken = () => {
  const token = sessionStorage.getItem("accessToken");
  try {
    return token ? JSON.parse(token) : null;
  } catch (e) {
    console.error("Failed to parse access token", e);
    return null;
  }
};
