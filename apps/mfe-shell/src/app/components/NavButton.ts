export const NavButton = ({ route, label }) => {
  return `
    <button class="btn-generic" type="button" id="${route}">
      ${label}
    </button>
  `;
};
