export const NavButton = ({ route }) => {
  return `
    <button class="btn-generic" type="button" id="${route}">
      ${route.toUpperCase()}
    </button>
  `;
};
