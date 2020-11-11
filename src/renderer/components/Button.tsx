import React  from 'react';

type Props = {
    title: string,
    href: string,
}

const Button = ({ href, title }: Props) => {
    return (
        <a
            href={href}
        >
            {title}
        </a>
    )
}

export default Button;
