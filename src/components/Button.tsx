import { Link } from 'react-router-dom'

type ButtonProps = 
    | {to: string; onClick?: never; type?:never; disabled?: never}
    | {to?: never; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean}
interface CommonProps {
    text: string;
    color?: 'blue' | 'white' | 'red';
    className?: string;
}

export default function Button(props: ButtonProps & CommonProps) {
    const { text, to, onClick, type = 'button', disabled, color = 'blue', className } = props
    const buttonColor : Record<CommonProps["color"], string> = {
        'blue':'text-white hover:text-brand-blue bg-brand-blue hover:bg-brand-border',
        'white':'border border-brand-border bg-white hover:bg-brand-border',
        'red':'text-white bg-red-900 hover:bg-red-700 disabled:bg-brand-slate'
    }

    const buttonStyle = `py-[10px] px-[14px] rounded-10px text-sm text-center font-semibold ${buttonColor[color]} duration-200 ${className} ${to ? '' : 'cursor-pointer'}`
    return (
            to ? <Link to={to} relative='path' className={buttonStyle}>
                {text}
            </Link>
            : <button type={type} onClick={onClick} disabled={disabled} className={buttonStyle}>
                {text}
            </button>
    )
}
