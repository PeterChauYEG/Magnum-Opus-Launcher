import React, {useState} from 'react';
import '../../../public/index.scss'

type Props = {
    title: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: any,
}

const Button = ({ onClick, title }: Props) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                fontFamily: "'Open Sans', sans-serif",
                color: isHovered
                    ? 'rgba(255, 255, 255, 0.75)'
                    : 'rgba(0, 0, 0, 0.75)',
                textDecoration: 'none',
                padding: '8px',
                borderColor: 'rgba(0, 0, 0, 0.75)',
                backgroundColor:  isHovered
                    ? 'rgba(0, 0, 0, 0.75)'
                    : 'rgba(255, 255, 255, 0.75)',
                borderWidth: '3px',
                borderRadius: '8px',
                borderStyle: 'solid',
                minWidth: '200px',
                textAlign: 'center',
            }}
        >
            {title}
        </div>
    )
}

export default Button;
