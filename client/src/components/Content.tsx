type MessagePropType = {
    message: string
}


export const Content = ({ message }: MessagePropType) => {
    return (
        <div>
            <h1>Content</h1>
            <p>This is the content of the page.</p>
            <p>{message}</p>
        </div>
    )
}