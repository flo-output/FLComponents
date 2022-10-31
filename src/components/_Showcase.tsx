import Button from "./Button"

const components: { [key: string]: JSX.Element } = {
    'Button': <Button children={'Hello, world!'} />,
}

export default function Showcase() {
    return (
        <>
            {
                Object.entries(components).map(c => {
                    return (
                        <div key={c[0]}>
                            {c[1]}
                            <h2>{c[0]}</h2>
                        </div>
                    )
                })
            }
        </>
    )
}