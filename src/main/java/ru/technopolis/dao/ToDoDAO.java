package ru.technopolis.dao;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.technopolis.model.ToDo;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {

    private final ConcurrentMap<String, AtomicLong> counters = new ConcurrentHashMap<>();
    private final ConcurrentMap<String, CopyOnWriteArrayList<ToDo>> todoList = new ConcurrentHashMap<>();

    public ToDo create(String description) {
        checkDB();
        getList().add(new ToDo(counters.get(getUserName()).getAndIncrement(), description, false));
        return getList().get(getList().size() - 1);
    }

    private List<ToDo> getList() {
        return todoList.get(getUserName());
    }

    private void checkDB() {
        if (!todoList.containsKey(getUserName())) {
            todoList.put(getUserName(), new CopyOnWriteArrayList<>());
            counters.put(getUserName(), new AtomicLong());
        }
    }

    private String getUserName() {
        return
                SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public ToDo update(long id, String description, boolean checked) {
        int todoId = getToDoId(id);
        if (todoId == -1)
            return null;
        checkDB();
        getList().set(todoId, new ToDo(id, description == null ? getList().get(todoId).getDescription() : description, checked));
        return getList().get(todoId);
    }

    private int getToDoId(long id) {
        if (id < 0)
            return -1;
        checkDB();
        for (int i = 0; i < getList().size(); i++) {
            if (getList().get(i).getId() == id)
                return i;
        }
        return -1;
    }

    public ToDo delete(long id) {
        int taskId = getToDoId(id);
        if (taskId == -1)
            return null;
        checkDB();
        return getList().remove(taskId);
    }

    public ToDo[] getToDos() {
        checkDB();
        ToDo[] toDos = new ToDo[getList().size()];

        return getList().toArray(toDos);
    }
}