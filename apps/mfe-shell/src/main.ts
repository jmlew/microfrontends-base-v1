import { ClientConfig, clientsConfig } from '@microfr/shell';
import { MfeClientsController, MfeNavbarController } from './app/controllers';

const clientConfigs: ClientConfig[] = [
  clientsConfig.clientOrange,
  clientsConfig.clientRed,
  clientsConfig.clientBlue,
];

const shell: MfeClientsController = new MfeClientsController(clientConfigs);
const navBar: MfeNavbarController = new MfeNavbarController(clientConfigs);

shell.initClients();
navBar.initButtons();

// Call the Angular apps' enableProdMode method once and remove from each main.ts.
(window as any).ng.core.enableProdMode();
