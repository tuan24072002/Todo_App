"use client"

import Navbar from "@/components/Navbar";
import TodoList from "@/components/TodoList";
import { useEffect, useState } from "react";
import { getAll, resetActionState } from '@/redux/reducers/todo'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Skeleton } from "@/components/ui/skeleton";
import { completed, failed, processing } from "@/utils/alert";

const Home = () => {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector(state => state.todo);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch])

  useEffect(() => {
    switch (todoState.status) {
      case 'failed':
        failed(todoState.error);
        break;
      case "loading":
        break;
      case "completed":
        break;
    }
  }, [todoState.error, todoState.status])

  useEffect(() => {
    switch (todoState.statusAction) {
      case 'failed':
        failed(todoState.error);
        dispatch(resetActionState());
        break;
      case "loading":
        processing();
        break;
      case 'completed':
        completed(todoState.success);
        setTimeout(() => {
          dispatch(getAll());
        }, 1000);
        dispatch(resetActionState());
        break;
    }
  }, [dispatch, todoState])
  return (
    <div className="w-full min-h-screen max-w-4xl mx-auto flex flex-col gap-4">
      <Navbar
        open={open}
        setOpen={setOpen}
      />
      {
        todoState.status === "loading" ?
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={`skeleton-${index}`}
              className="w-full rounded-md p-8 bg-gray-50 shadow"
            />
          )) :
          <TodoList setOpen={setOpen} />
      }
    </div>
  );
}

export default Home;
