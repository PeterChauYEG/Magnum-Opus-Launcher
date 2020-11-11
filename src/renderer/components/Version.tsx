import React from 'react';

type Props = {
    installedClientVersion?: string,
}

const Version = (props: Props) => {
    const { installedClientVersion } = props
    return (
        <p
            style={{
                marginTop: 0,
                marginRight: 0,
                marginBottom: '8px',
                marginLeft: '8px'
            }}
        >
            {`Installed version: ${installedClientVersion}`}
        </p>
    );
}

export default Version;
