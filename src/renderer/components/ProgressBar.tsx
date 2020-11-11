import React, {useState} from 'react';
import '../../../public/index.scss'

type Props = {
    percent: number,
}

const Progress = ({ percent }: Props) => {
    const width = 500
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        const newValue = percent >= 1
            ? width
            : percent * width
        setValue(newValue);
    });

    return (
        <div
            style={{
                backgroundColor: 'rgb(233, 233, 233)',
                borderRadius: '1rem',
                width: `${width}px`
            }}
        >
            <div
                style={{
                    backgroundColor: percent >= 1
                        ? 'rgb(0,235,192)'
                        : 'rgb(62, 122, 235)',
                    height: '24px',
                    borderRadius: '1rem',
                    width: `${value}px`,
                    transition: '0.5s ease',
                    transitionDelay: '0.1s'
                }}
            />
        </div>
    )
}

export default Progress;
