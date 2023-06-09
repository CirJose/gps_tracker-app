import { Paper } from "@mui/material";

const style = {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
}

const styleItem = {
    textAlign: 'center',
    paddingBottom: '10px',
    paddingTop: '10px'
}

function VerticalMenu({ children, items = [], labels = false }) {
    return (
        <ul style={style}>
            {/* {children} */}
            {
                items.map((item) =>
                    <li style={styleItem}>
                        <Paper elevation={0} style={{ backgroundColor: 'transparent' }}>
                            {item.icon}
                            {labels && <span>{item.name}</span>}
                        </Paper>
                    </li>
                )
            }
        </ul>
    )
}

export default VerticalMenu;