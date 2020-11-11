import React from 'react';
import { version as installedLauncherVersion } from '../../../package.json';
import Button from "./Button";

type Props = {
    latestLauncherVersion?: string,
}

const LauncherVersion = (props: Props) => {
    const { latestLauncherVersion } = props

    if (installedLauncherVersion === latestLauncherVersion) {
        return null
    }

    return (
        <Button
            title={'Update Game Launcher'}
            href={'https://s3-us-west-1.amazonaws.com/launcher.magnum-opus.gg/windows/magnum-opus-launcher.exe'}
        />
    )
}

export default LauncherVersion;
