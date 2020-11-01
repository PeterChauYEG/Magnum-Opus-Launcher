import React, { Component } from 'react';
import { version as installedLauncherVersion } from '../../../package.json';

type Props = {
    latestLauncherVersion?: string,
}

class LauncherVersion extends Component<Props> {
    render() {
        const { latestLauncherVersion } = this.props

        if (installedLauncherVersion === latestLauncherVersion) {
            return null
        }

        return (
            <a href={'https://s3-us-west-1.amazonaws.com/launcher.magnum-opus.gg/windows/magnum-opus-launcher.zip'}>Update game launcher</a>
        )
    }
}

export default LauncherVersion;
