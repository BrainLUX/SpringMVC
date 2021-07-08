package ru.technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.technopolis.dao.ToDoDAO;
import ru.technopolis.model.ToDo;

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/")
    public String index(Model model) {
        model.addAttribute("todoList", dao.getToDos());
        return "index";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<String> create(@RequestParam String description) {
        if (description == null || description.trim().length() == 0 || description.length() > 100)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(String.valueOf(dao.create(description).getId()));
    }

    @RequestMapping(value = "/read", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<ToDo[]> read() {
        return ResponseEntity.ok(dao.getToDos());
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<ToDo> update(@RequestParam String id, String description, @RequestParam boolean checked) {
        if (description != null && (description.trim().length() == 0 || description.length() > 100
                || id == null))
            return ResponseEntity.badRequest().build();
        ToDo toDo = dao.update(Long.parseLong(id), description, checked);
        if (toDo == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(toDo);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseEntity<Void> delete(@RequestParam String id) {
        if (id == null || id.length() == 0)
            return ResponseEntity.badRequest().build();
        ToDo toDo = dao.delete(Long.parseLong(id));
        if (toDo == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().build();
    }


}