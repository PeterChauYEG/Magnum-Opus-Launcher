import React, { Component } from 'react';
import CTA from "./CTA";
import Version from "./Version";
import Header from "./Header";
import storage from 'electron-localstorage'
import LauncherVersion from "./LauncherVersion";

type Props = {
	latestClientVersion?: string,
	latestLauncherVersion?: string,
	os: string,
}
type State = {
	installedClientVersion?: string,
}

class StartPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			installedClientVersion: storage.getItem('installedClientVersion'),
		}
	}

	componentDidMount(): void {
		this.setState({
			installedClientVersion: storage.getItem('installedClientVersion'),
		})
	}

	render() {
		const { latestLauncherVersion, latestClientVersion, os } = this.props
		const { installedClientVersion,  } = this.state

		return(
			<div>
				<Header />
				<div>
					<CTA installedClientVersion={installedClientVersion} latestClientVersion={latestClientVersion} os={os} />
				</div>
			<Version installedClientVersion={installedClientVersion} latestClientVersion={latestClientVersion} />
			<LauncherVersion latestLauncherVersion={latestLauncherVersion} />
		  </div>
		);
  	}
}
export default StartPage;
