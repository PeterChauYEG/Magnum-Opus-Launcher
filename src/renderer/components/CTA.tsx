import React  from 'react';
import { Link } from "react-router-dom";
import Button from "./Button";

const { shell } = require('electron')
const app = require('electron').remote.app
const userDataPath = app.getPath('userData')

type Props = {
    latestClientVersion?: string;
    installedClientVersion?: string;
    os: string;
}

const CTA = ({
     os,
     installedClientVersion,
     latestClientVersion
}: Props) =>  {
    const startGame = (): void => {
        const path = os === 'darwin'
            ? `${userDataPath}/MagnumOpus/MagnumOpus.app`
            : `${userDataPath}/MagnumOpus/MagnumOpus.exe`

        shell.openItem(path)
    }

    if (!installedClientVersion) {
        return <Link to="/download">Download Game</Link>
    }

    if (installedClientVersion != latestClientVersion) {
        return <Link to="/download">Update Game</Link>
    }

    return (
        <Button
            onClick={startGame}
            title={'Launch'}
        />
    )
}

export default CTA;
