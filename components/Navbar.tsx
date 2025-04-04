import React from 'react'
import TodoForm from './TodoForm'
type Props = {
    open: boolean,
    setOpen: (e: boolean) => void
}
const Navbar = ({ open, setOpen }: Props) => {
    return (
        <div className="h-20 bg-black/20 flex items-center justify-between px-4">
            <h2 className='font-bold text-2xl'>Todo app</h2>
            <TodoForm
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}

export default Navbar