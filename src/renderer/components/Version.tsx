import React, { Component } from 'react';

type Props = {
    latestClientVersion?: string,
    installedClientVersion?: string,
}

class Version extends Component<Props> {
    render() {
        const { installedClientVersion, latestClientVersion } = this.props
        return (
            <p>
                {`Installed Client version: ${installedClientVersion} || Latest Client version: ${latestClientVersion}`}
            </p>
        );
    }
}

export default Version;
