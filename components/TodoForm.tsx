"use client"
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { todoSchema } from '@/utils/validation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { addItem, changeAction, deleteItem, editItem, selectItem } from '@/redux/reducers/todo'
import TodoModel from '@/models/frontend/todo'

type Props = {
    open: boolean,
    setOpen: (e: boolean) => void
}
const TodoForm = ({ open, setOpen }: Props) => {
    const dispatch = useAppDispatch();
    const todoState = useAppSelector(state => state.todo);
    const disabledInput = !["INS", "UPD"].includes(todoState.action);
    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: TodoModel.initial()
    })
    const onSubmit = (value: z.infer<typeof todoSchema>) => {
        const payload: any = {
            id: value.id || "",
            data: {
                id: value.id || "",
                title: value.title,
                description: value.description
            }
        }
        switch (todoState.action) {
            case "INS":
                dispatch(addItem(payload));
                break;
            case "UPD":
                dispatch(editItem(payload));
                break;
            case "DEL":
                dispatch(deleteItem(payload));
                break;
        }
        setOpen(false);
    }
    const handleOpenDialog = () => {
        dispatch(changeAction("INS"));
        dispatch(selectItem(TodoModel.initial()));
        form.reset({ title: "", description: "" });
    }
    useEffect(() => {
        if (todoState.item) {
            form.reset({
                id: todoState.item.id || "",
                title: todoState.item.title || "",
                description: todoState.item.description || ""
            });
        }
    }, [todoState.item, form]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleOpenDialog} variant="outline"><Plus />Add item</Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>{
                                todoState.action === "INS" ?
                                    "Add" : todoState.action === "UPD" ?
                                        "Update" : "Delete"
                            } todo</DialogTitle>
                        </DialogHeader>
                        <div className="grid w-full items-center gap-4 my-4">
                            {
                                todoState.action !== "INS" &&
                                <div className="flex flex-col space-y-1.5">
                                    <FormField
                                        control={form.control}
                                        name="id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            }
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your title"
                                                    {...field}
                                                    disabled={disabledInput}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter your description"
                                                    {...field}
                                                    disabled={disabledInput}
                                                    className='min-h-40 resize-none'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type='button' onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                            <Button type='submit'>Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default TodoForm