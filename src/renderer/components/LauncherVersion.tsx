import React from 'react';
import { version as installedLauncherVersion } from '../../../package.json';
import LinkButton from "./LinkButton";

type Props = {
    latestLauncherVersion?: string,
}

const LauncherVersion = (props: Props) => {
    const { latestLauncherVersion } = props

    if (installedLauncherVersion === latestLauncherVersion) {
        return null
    }

    return (
        <LinkButton
            title={'Update Game Launcher'}
            href={'https://s3-us-west-1.amazonaws.com/launcher.magnumopus.gg/windows/magnum-opus-launcher.exe'}
        />
    )
}

export default LauncherVersion;
