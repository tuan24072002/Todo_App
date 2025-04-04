"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from './ui/button'
import { Pen, Trash2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { changeAction, selectItem } from '@/redux/reducers/todo'
import TodoModel from '@/models/frontend/todo'
interface Props {
    setOpen: (e: boolean) => void
}
const TodoList = ({ setOpen }: Props) => {
    const dispatch = useAppDispatch();
    const todoState = useAppSelector(state => state.todo);

    const handleAction = (action: string, todoItem: TodoModel) => {
        dispatch(changeAction(action));
        dispatch(selectItem(todoItem));
        setOpen(true);
    }
    return (
        <ScrollArea className='overflow-y-auto max-h-[calc(100vh-112px)]'>
            <div className="h-full space-y-4 overflow-hidden">
                {
                    todoState.list?.length > 0 && todoState.list?.map((item, index) => {
                        return (
                            <div className={cn(
                                "w-full flex items-center justify-between border border-gray-400 rounded-md p-4 bg-gray-50 shadow",
                            )} key={index}>
                                <p className='font-semibold text-lg'>
                                    {item.title}
                                </p>
                                <div className="space-x-2">
                                    <Button onClick={() => handleAction("UPD", item)} className='bg-blue-600 hover:bg-blue-500' size={'icon'}>
                                        <Pen />
                                    </Button>
                                    <Button onClick={() => handleAction("DEL", item)} variant={'destructive'} size={'icon'}>
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </ScrollArea>
    )
}

export default TodoList