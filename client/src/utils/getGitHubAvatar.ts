export const getGitHubAvatar = (id: number) => {
  if (id) {
    return `https://avatars.githubusercontent.com/u/${id}?v=4`;
  } else {
    return ''; // FIXME
  }
};
