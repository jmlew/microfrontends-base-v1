import { ClientConfig } from '@microfr/shell';

export const NavButton = ({ route, label }: ClientConfig) => {
  return `
    <button class="btn-generic" type="button" id="${route}">
      ${label}
    </button>
  `;
};
