import React, { Component, Fragment } from 'react';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import './styles.scss';

import { ClientAppDetails } from '@microfr/shared/model/app-interface';
import * as fromCommonUtils from '@microfr/shared/util/common';
import { appInterface } from '../../core/helpers';
import { AppHeader } from '../../layout/AppHeader/Header';
import { Details } from '../../shared/components/Details';

interface ShellViewProps {}

interface ShellViewState {
  appName: string;
  appDescription: string;
}

class ShellView extends Component<ShellViewProps, ShellViewState> {
  private unsubscribe: Subject<unknown> = new Subject();
  state: ShellViewState;

  constructor(props: ShellViewProps) {
    super(props);

    this.state = {
      appName: null,
      appDescription: null,
    };
  }

  componentDidMount() {
    appInterface.appDetails$
      .pipe(
        takeUntil(this.unsubscribe),
        filter((details: ClientAppDetails) => details != null),
        map((details: ClientAppDetails) => details.name)
      )
      .subscribe((appName: string) => this.setState({ appName }));

    appInterface.appDetails$
      .pipe(
        takeUntil(this.unsubscribe),
        filter((details: ClientAppDetails) => details != null),
        map((details: ClientAppDetails) => details.description)
      )
      .subscribe((appDescription: string) => this.setState({ appDescription }));
  }

  componentWillUnmount() {
    fromCommonUtils.destroy(this.unsubscribe);
  }

  render() {
    const { appName, appDescription } = this.state;
    return (
      <Fragment>
        <AppHeader appName={appName} />
        <div className="app-content">
          <Details appDescription={appDescription} />
          {/* <router-outlet/>*/}
        </div>
      </Fragment>
    );
  }
}

export default ShellView;
