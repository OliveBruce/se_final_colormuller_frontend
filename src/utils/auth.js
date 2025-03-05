export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "Olivia Bruce", email: "fake@example,com", _id: "fake-id" },
    });
  });
};

export const updateProfileName = (newName) => {
  return new Promise((resolve, reject) => {
    resolve({ name: newName });
  });
};
